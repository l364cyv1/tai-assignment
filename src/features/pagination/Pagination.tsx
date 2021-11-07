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
    if (numOfPages <= 6) {
        for (let i = 1; i <= numOfPages; i++) {
            pagination.push(
                <li key={ i }>
                    <button disabled={ page === i } onClick={ () => dispatch(goToPage(i)) }>{ i }</button>
                </li>
            );
        }
    } else {
        if (page > 2) {
            pagination.push(
                <li key={1}>
                    <button disabled={false} onClick={ () => dispatch(goToPage(1)) }>{ 1 }</button>
                </li>
            );
        }
        if (page > 3) {
            pagination.push(
                <li key="pre-dots">
                    ...
                </li>
            );
        }
        const startPage = page === 1 ? 1 : page - 1;
        const endPage = page === numOfPages ? numOfPages : page + 1;
        for (let i = startPage; i <= endPage; i++) {
            pagination.push(
                <li key={ i }>
                    <button disabled={ page === i } onClick={ () => dispatch(goToPage(i)) }>{ i }</button>
                </li>
            );
        }
        if (page <= numOfPages - 3) {
            pagination.push(
                <li key="post-dots">
                    ...
                </li>
            );
        }
        if (page <= numOfPages - 2) {
            pagination.push(
                <li key={numOfPages}>
                    <button disabled={false} onClick={ () => dispatch(goToPage(numOfPages)) }>{ numOfPages }</button>
                </li>
            );
        }
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
