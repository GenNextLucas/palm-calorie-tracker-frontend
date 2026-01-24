import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './foodSlice';

export const store = configureStore({
    reducer: {
        foods: foodReducer, // Access this via state.foods in components
    }
});