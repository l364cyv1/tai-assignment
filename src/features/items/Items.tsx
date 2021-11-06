import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchItems, QueryParams } from './itemSlice';
import Item from './Item';
import { useEffect, useRef } from 'react';
import { goToPage } from '../pagination/paginationSlice';
import { Link } from 'react-router-dom';
import './Items.scss';
import Loader from '../loader/Loader';
import { isMinSearchValid } from '../../app/utils';

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
        if (!isMinSearchValid(search)) {
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


    if (status === 'loading') {
        return (
            <Loader/>
        );
    }

    return (
        <>
            <table>
                <tbody>
                    { items.map(item => {
                        return (
                            <tr key={ item.id }>
                                <td>
                                    <Link className={"item-link"} to={`/items/${item.id}`}>
                                        <Item id={ item.id } name={ item.name }/>
                                    </Link>
                                </td>
                            </tr>
                        );
                    }) }
                </tbody>
            </table>
        </>
    );
}

export default Items;
