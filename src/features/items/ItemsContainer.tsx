import Search from '../search/Search';
import Items from './Items';
import Pagination from '../pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Loader from '../loader/Loader';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { isMinSearchValid } from '../../app/utils';
import { fetchItems, scrollPosition } from './itemSlice';
import { goToPage } from '../pagination/paginationSlice';
import { QueryParams } from '../../app/interfaces';
import debounce from 'lodash.debounce';

const ItemsContainer = () => {
    const { items, total, loading, scroll } = useAppSelector(state => state.items);
    const search = useAppSelector(state => state.search.q);
    const pagination = useAppSelector(state => state.pagination);
    const isFirstRun = useRef(true);
    const dispatch = useAppDispatch();
    const scrollEventListener = (e: any) => {
        dispatch(scrollPosition(e.target.scrollTop));
    }
    const tableEl: MutableRefObject<any> = useRef(null);
    const debouncedScroll = useCallback(debounce(scrollEventListener, 200),[]);

    useEffect(() => {
        if (isFirstRun.current || !isMinSearchValid(search)) {
            isFirstRun.current = false;
            return;
        }
        if (pagination.page === 1) {
            // if pagination equals 1 already call fetchItems directly
            // as dispatching goToPage(1) won't trigger useEffect
            dispatch(fetchItems({name: search, page: 1}));
        } else {
            // reset pagination on search and fetch items
            dispatch(goToPage(1));
        }
    }, [search]);

    useEffect(() => {
        let queryParams: QueryParams = {
            page: pagination.page,
        }
        if (isMinSearchValid(search)) {
            queryParams = {
                ...queryParams,
                name: search,
            }
        }
        dispatch(fetchItems(queryParams));
    }, [pagination.page]);

    useEffect(() => {
        tableEl.current.addEventListener('scroll', debouncedScroll);
    }, []);

    useEffect(() => {
        if (!loading) {
            tableEl.current.scrollTop = scroll;
        }
    }, [loading]);

    return (
        <>
            <div className="header-wrapper">
                <h1>Rick and Morty App</h1>
                <Search/>
            </div>
            <div className="content-wrapper">
                <Loader loading={loading}/>
                <div className="table-wrapper" ref={tableEl}>
                    <Items items={items}/>
                </div>
                <Pagination page={pagination.page} collectionSize={total} itemsPerPage={20}/>
            </div>
        </>
    );
}

export default ItemsContainer;
