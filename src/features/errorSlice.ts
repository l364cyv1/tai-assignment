import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
    error: boolean;
    message: string;
}

const initialState: ErrorState = {
    error: false,
    message: "",
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        error(state, action:PayloadAction<ErrorState>) {
            state.error = action.payload.error;
            state.message = action.payload.message;
        }
    }
});

export const { error } = errorSlice.actions;

export default errorSlice.reducer;
