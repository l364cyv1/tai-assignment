import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { search } from './searchSlice';
import { ChangeEvent, useState } from 'react';
import { isMinSearchValid } from '../../app/utils';


function Search() {
    const dispatch = useAppDispatch();
    const { q } = useAppSelector(state => state.search);
    const [showHint, setHint] = useState(!isMinSearchValid(q));
    function handleSearchInput(e: ChangeEvent<HTMLInputElement>) {
        const qTerm = e.target.value;
        setHint(!isMinSearchValid(qTerm));
        dispatch(search(qTerm));
    }
    return (
        <>
            <input
                type="text"
                onChange={handleSearchInput}
                placeholder={"Search characters by name"}
                defaultValue={q}
            />
            { showHint && <p>Type at least 3 chars to filter characters.</p> }
        </>
    );
}


export default Search;
