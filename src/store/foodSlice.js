import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/foodApi';

// Async Thunks for API interactions
export const fetchFoods = createAsyncThunk('foods/fetchAll', async () => {
    return await api.getFoods();
});

export const removeFood = createAsyncThunk('foods/remove', async (id) => {
    const response = await api.deleteFood(id);
    return { id, message: response.message };
});

export const addFood = createAsyncThunk('foods/add', async (newItem) => {
    return await api.createFood(newItem);
});

export const editFood = createAsyncThunk('foods/edit', async (updatedData) => {
    return await api.updateFood(updatedData);
});

const foodSlice = createSlice({
    name: 'foods',
    initialState: { items: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchFoods.fulfilled, (state, action) => {
          state.items = action.payload;
        })
        .addCase(removeFood.fulfilled, (state, action) => {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        })
        .addCase(addFood.fulfilled, (state, action) => {
            state.items.push(action.payload);
        })
        .addCase(editFood.fulfilled, (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        })

    },
  });

export default foodSlice.reducer;