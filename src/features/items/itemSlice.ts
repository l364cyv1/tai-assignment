import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../app/api'
import { ItemInterface, QueryParams } from '../../app/interfaces';
import { error } from '../errorSlice';

interface ItemsResponse {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    },
    results: ItemInterface[],
}

interface ItemsState {
    items: ItemInterface[];
    total: number;
    scroll: number;
    loading: boolean;
}

export const fetchItems = createAsyncThunk<
    ItemsResponse,
    QueryParams,
    {
        rejectValue: number,
    }
>(
    'fetchItems',
    async ({name , page}, {
        rejectWithValue,
        dispatch
    }) => {
        try {
            let params: QueryParams = {
                page,
            }
            if (name) {
                params = {
                    ...params,
                    name,
                }
            }
            const {
                data
            } = await api.get<ItemsResponse>('/character', {
                params
            });
            dispatch(error({
                error: false,
                message: ''
            }));
            return data;
        } catch (err: any) {
            if (err?.response?.status !== 404) {
                dispatch(error({
                    error: true,
                    message: 'Oops something went wrong while fetching characters.'
                }));
            }
            return rejectWithValue(err.response.status);
        }
    }
);

const initialState: ItemsState = {
    items: [],
    total: 0,
    scroll: 0,
    loading: true,
}

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        loading(state, action) {
            state.loading = action.payload;
        },
        scrollPosition (state, action) {
            state.scroll = action.payload;
        },
    },
    extraReducers: builder => {
        builder
        .addCase(fetchItems.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchItems.fulfilled, (state, action: PayloadAction<ItemsResponse>) => {
            state.items = [...action.payload.results];
            state.total = action.payload.info.count;
            state.loading = false;
        })
        .addCase(fetchItems.rejected, (state, action) => {
            // search query had no matches
            // empty view
            if (action.payload === 404) {
                state.loading = false;
                state.items = [];
                state.total = 0;
            }
        });
    }
});

export const { loading, scrollPosition } = itemSlice.actions;

export default itemSlice.reducer;
