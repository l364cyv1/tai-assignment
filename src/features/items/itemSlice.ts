import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../app/api'

export interface ItemInterface {
    "id": number;
    "name": string;
    "status": string;
    "species": string;
    "type": string;
    "gender": string;
    "origin": {
        "name":  string;
        "url":  string;
    },
    "location": {
        "name": string;
        "url": string;
    },
    "image": string;
    "episode": string[];
    "url": string;
    "created": string;
}



interface ItemsResponse {
    "info": {
        "count": number;
        "pages": number;
        "next": string;
        "prev": string;
    },
    results: ItemInterface[],
}

interface QueryParams {
    name?: string;
    page: number;
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
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response.status);
        }
    }
);

interface ItemsState {
    items: ItemInterface[];
    total: number;
    status: string;
}

const initialState: ItemsState = {
    items: [],
    total: 0,
    status: 'loading',
}

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
    //
    },
    extraReducers: builder => {
        builder
        .addCase(fetchItems.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchItems.fulfilled, (state, action: PayloadAction<ItemsResponse>) => {
            state.items = [...action.payload.results];
            state.status = 'idle';
            state.total = action.payload.info.count;
        })
        .addCase(fetchItems.rejected, (state, action) => {
            state.status = 'idle';
            if (action.payload === 404) {
                state.items = [];
                state.total = 0;
            }
        });
    }
})

export default itemSlice.reducer;
