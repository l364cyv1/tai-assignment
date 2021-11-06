import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface searchState {
    q: string;
}

const initialState: searchState = {
    q: '',
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        search(state, action: PayloadAction<string>) {
            state.q = action.payload;
        },
    }
});

export const { search } = searchSlice.actions;

export default searchSlice.reducer;



