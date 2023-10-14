// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cityReducer from './city/citySlice';

const store = configureStore({
  reducer: {
    city: cityReducer,
  },
});

export default store;
