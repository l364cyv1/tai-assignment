import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchItems } from './itemSlice';
import Item from './Item';
import { useEffect, useRef } from 'react';
import { goToPage } from '../pagination/paginationSlice';


function Items () {
    const { items, status } = useAppSelector(state => state.items);
    const search = useAppSelector(state => state.search.q);
    const pagination = useAppSelector(state => state.pagination);
    const isFirstRun = useRef(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
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
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        dispatch(fetchItems({name: search, page: pagination.page}));
    }, [pagination.page]);


    if (status === 'loading') {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <>
            { items.map(item => <Item key={item.id} id={ item.id } name={ item.name }/>) }
        </>
    );
}

export default Items;
