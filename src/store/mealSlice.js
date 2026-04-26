import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/mealApi';


export const fetchMealById = createAsyncThunk('meals/fetchById', async (id) => {
    return await api.fetchMealById(id);
});

export const fetchMeals = createAsyncThunk('meals/fetchAll', async () => {
    return await api.fetchMeals();
});


export const addMeal = createAsyncThunk('meals/add', async (newItem) => {
    return await api.saveMeal(newItem);
});

export const updateMeal = createAsyncThunk('meals/update', async (payload) => {
    const { id, mealData } = payload;
    return await api.updateMeal(id, mealData);
});


const mealSlice = createSlice({
    name: 'meals',
    initialState: {
        items: [], 
        loading: false,
        selectedMeal: null
    },
    reducers: {
        clearSelectedMeal: (state) => {
            state.selectedMeal = null;
        } 
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchMeals.fulfilled, (state, action) => {
            state.items = action.payload;
          })
        .addCase(addMeal.fulfilled, (state, action) => {
            state.items.push(action.payload)
        })
        .addCase(fetchMealById.fulfilled, (state, action) => {
            state.selectedMeal = action.payload;
            state.loading = false;
        })
        .addCase(updateMeal.fulfilled, (state, action) => {
            debugger;

            const updatedMeal = action.payload;
    
            const index = state.items.findIndex((item) => item.id === updatedMeal.id);
            
            debugger;

            if (index !== -1) {
                state.items[index] = updatedMeal;
            }
            
    
            state.selectedMeal = null;
            state.loading = false;

        });
    },

});

export const { clearSelectedMeal } = mealSlice.actions;
export default mealSlice.reducer;