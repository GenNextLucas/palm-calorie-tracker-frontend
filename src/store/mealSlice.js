import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/mealApi';



export const fetchMeals = createAsyncThunk('meals/fetchAll', async () => {
    return await api.fetchMeals();
});


export const addMeal = createAsyncThunk('meals/add', async (newItem) => {
    return await api.saveMeal(newItem);
});


const mealSlice = createSlice({
    name: 'meals',
    initialState: {items: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchMeals.fulfilled, (state, action) => {
            state.items = action.payload;
          })
        .addCase(addMeal.fulfilled, (state, action) => {
            state.items.push(action.payload)
        })
    },

});

export default mealSlice.reducer;