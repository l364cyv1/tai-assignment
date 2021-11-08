import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../app/api';
import { ItemInterface } from '../../app/interfaces';

type ItemDetailsState = {
    loading: boolean;
    data: ItemInterface,
}

const initialState: ItemDetailsState = {
    loading: true,
    data: {} as ItemInterface,
}

export const fetchItemDetails = createAsyncThunk<
    ItemInterface,
    string,
    {
        rejectValue: number,
    }
    >(
    'fetchItemDetails',
    async (id, {
        rejectWithValue,
        dispatch,
    }) => {
        try {
            const {
                data
            } = await api.get<ItemInterface>(`/character/${id}`);
            return data;
        } catch (err: any) {
            if (err?.response?.status === 404) {
                window.location.href = '/404';
            }
            return rejectWithValue(err?.response?.status || -1);
        }
    }
);

const itemDetailsSlice = createSlice({
    name: 'itemDetails',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchItemDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchItemDetails.fulfilled, (state, action: PayloadAction<ItemInterface>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchItemDetails.rejected, (state, action) => {
                state.loading = false;
            });
    }
})

export default itemDetailsSlice.reducer;
