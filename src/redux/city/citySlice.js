// src/redux/citySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  selectedCity: null,
  status: 'idle',
  error: null,
};

const apiKey = '&appid=f490250a671554a4185c4e5c1aabfda8';
const defaultURL = 'https://api.openweathermap.org/data/2.5/weather?q=';

export const fetchCityWeather = createAsyncThunk('city/fetchCityWeather', async (city) => {
  const response = await axios.get(`${defaultURL}${city}${apiKey}`);
  return response.data;
});

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityWeather.pending, (state) => {
        state.status = 'Weather Data is Loading';
      })
      .addCase(fetchCityWeather.fulfilled, (state, action) => {
        state.status = 'Weather Data Loaded Successfully';
        state.selectedCity = action.payload;
      })
      .addCase(fetchCityWeather.rejected, (state, action) => {
        state.status = 'Weather Data Loading Failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCity } = citySlice.actions;
export default citySlice.reducer;
