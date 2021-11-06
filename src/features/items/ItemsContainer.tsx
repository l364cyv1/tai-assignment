import Search from '../search/Search';
import Items from './Items';
import Pagination from '../pagination/Pagination';
import { useAppSelector } from '../../app/hooks';

const ItemsContainer = () => {
    const pagination = useAppSelector(state => state.pagination);
    const { total } = useAppSelector(state => state.items);
    return (
        <>
            <Search/>
            <Items/>
            <Pagination page={pagination.page} collectionSize={total} itemsPerPage={20}/>
        </>
    );
}

export default ItemsContainer;
