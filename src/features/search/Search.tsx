import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { search } from './searchSlice';
import { ChangeEvent, useState } from 'react';
import { isMinSearchValid } from '../../app/utils';
import './Search.scss';

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
        <div className="search-container">
            <input
                className="search-input"
                type="text"
                onChange={handleSearchInput}
                placeholder={"Search characters by name"}
                defaultValue={q}
            />
            { showHint && <p className="search-hint-message">Type at least 3 chars to filter characters.</p> }
        </div>
    );
}


export default Search;
