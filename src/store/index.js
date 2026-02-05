import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './foodSlice';
import mealReducer from './mealSlice';


export const store = configureStore({
    reducer: {
        foods: foodReducer,
        meals: mealReducer
    }
});