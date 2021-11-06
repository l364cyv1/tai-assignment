import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchItems } from './itemSlice';
import Item from './Item';
import { useEffect, useRef } from 'react';
import { goToPage } from '../pagination/paginationSlice';
import { Link } from 'react-router-dom';
import './Items.scss';

function Items () {
    const { items, status } = useAppSelector(state => state.items);
    const search = useAppSelector(state => state.search.q);
    const pagination = useAppSelector(state => state.pagination);
    const isFirstRun = useRef(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        if (search.length < 3 && search.length !== 0) {
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
        dispatch(fetchItems({name: search, page: pagination.page}));
    }, [pagination.page]);


    if (status === 'loading') {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <>
            { items.map(item => {
                return (
                    <Link className={"item-link"} key={ item.id }  to={`/items/${item.id}`}>
                        <Item id={ item.id } name={ item.name }/>
                    </Link>
                );
            }) }
        </>
    );
}

export default Items;
