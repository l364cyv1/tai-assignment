import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import itemsReducer from '../features/items/itemSlice';
import paginationReducer from '../features/pagination/paginationSlice';

export const store = configureStore({
    reducer: {
        search: searchReducer,
        items: itemsReducer,
        pagination: paginationReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
