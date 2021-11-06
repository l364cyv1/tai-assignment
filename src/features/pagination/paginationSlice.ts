import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
    page: number;
}

const initialState: PaginationState = {
    page: 1,
}

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        goToPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        nextPage(state) {
            state.page++;
        },
        prevPage(state) {
            state.page--;
        }
    }
});

export const { goToPage, nextPage, prevPage } = paginationSlice.actions;

export default paginationSlice.reducer;
