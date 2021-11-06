import { useAppDispatch } from '../../app/hooks';
import { search } from './searchSlice';
import { ChangeEvent } from 'react';


function Search() {
    const dispatch = useAppDispatch();
    function handleSearchInput(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length >= 3 || e.target.value.length == 0) {
            const query = e.target.value.length === 0 ? '' : e.target.value;
            dispatch(search(query));
        }
    }
    return (
        <input type="text" onChange={handleSearchInput} placeholder={"Search characters by name"}/>
    );
}


export default Search;
