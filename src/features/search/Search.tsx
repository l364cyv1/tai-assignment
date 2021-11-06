import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { search } from './searchSlice';
import { ChangeEvent } from 'react';


function Search() {
    const dispatch = useAppDispatch();
    const { q } = useAppSelector(state => state.search);
    function handleSearchInput(e: ChangeEvent<HTMLInputElement>) {
        dispatch(search(e.target.value));
    }
    return (
        <>
            <input
                type="text"
                onChange={handleSearchInput}
                placeholder={"Search characters by name"}
                defaultValue={q}
            />
        </>
    );
}


export default Search;
