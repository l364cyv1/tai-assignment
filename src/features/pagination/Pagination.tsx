import { FC } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { goToPage, nextPage, prevPage } from './paginationSlice';
import './Pagination.scss';

const Pagination: FC<{
    page: number,
    collectionSize: number,
    itemsPerPage: number,
}> = ({page, collectionSize, itemsPerPage}) => {
    const numOfPages = Math.ceil(collectionSize / itemsPerPage);
    const dispatch = useAppDispatch();
    const pagination = [];
    if (collectionSize === 0) {
        return <></>;
    }
    pagination.push(
        <li key={ 'prev' }>
            <button disabled={page === 1} onClick={ () => dispatch(prevPage()) }>previous</button>
        </li>
    );
    for (let i = 1; i <= numOfPages; i++) {
        pagination.push(
            <li key={i}>
                <button disabled={page === i}onClick={() => dispatch(goToPage(i))}>{i}</button>
            </li>
        );
    }
    pagination.push(
        <li key={'next'}>
            <button disabled={page === numOfPages} onClick={() => dispatch(nextPage())}>Next</button>
        </li>
    );

    return (
        <ul className={ 'pagination-container' }>{pagination}</ul>
    );
}

export default Pagination;
