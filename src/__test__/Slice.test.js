import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import cityReducer, { fetchCityWeather } from '../redux/city/citySlice';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('citySlice async actions', () => {
  it('fetchCityWeather action pending', () => {
    const store = mockStore({});
    store.dispatch(fetchCityWeather('London'));
    const actions = store.getActions();
    expect(actions[0].type).toBe('city/fetchCityWeather/pending');
  });

  it('fetchCityWeather action fulfilled', async () => {
    const store = mockStore({});
    await store.dispatch(fetchCityWeather('London'));
    const actions = store.getActions();
    expect(actions[1].type).toBe('city/fetchCityWeather/fulfilled');
    expect(actions[1].payload).toBeTruthy(); // Adjust this expectation as needed
  });

  it('cityReducer initial state', () => {
    const initialState = { selectedCity: null, status: 'idle', error: null };
    const state = cityReducer(undefined, { type: 'non_existent_action' });
    expect(state).toEqual(initialState);
  });

  it('cityReducer fetchCityWeather.pending', () => {
    const initialState = { selectedCity: null, status: 'idle', error: null };
    const state = cityReducer(initialState, fetchCityWeather.pending);
    expect(state.status).toBe('Weather Data is Loading');
  });

  it('cityReducer fetchCityWeather.fulfilled', () => {
    const initialState = { selectedCity: null, status: 'idle', error: null };
    const mockCityData = { name: 'London', temperature: 20 };
    const state = cityReducer(initialState, {
      type: fetchCityWeather.fulfilled.type,
      payload: mockCityData,
    });
    expect(state.status).toBe('Weather Data Loaded Successfully');
    expect(state.selectedCity).toEqual(mockCityData);
  });

  it('cityReducer fetchCityWeather.rejected', () => {
    const initialState = { selectedCity: null, status: 'idle', error: null };
    const error = new Error('City not found');
    const state = cityReducer(initialState, {
      type: fetchCityWeather.rejected.type,
      error,
    });
    expect(state.status).toBe('Weather Data Loading Failed');
    expect(state.error).toEqual(error.message);
  });

  it('cityReducer fetchCityWeather.pending with existing state', () => {
    const initialState = {
      selectedCity: null,
      status: 'Weather Data Loaded Successfully',
      error: null,
    };
    const state = cityReducer(initialState, fetchCityWeather.pending);
    expect(state.status).toBe('Weather Data is Loading');
  });
  it('cityReducer fetchCityWeather.rejected', () => {
    const initialState = { selectedCity: null, status: 'idle', error: null };
    const error = new Error('City not found');
    const state = cityReducer(initialState, {
      type: fetchCityWeather.rejected.type,
      error,
    });
    expect(state.status).toBe('Weather Data Loading Failed');
    expect(state.error).toEqual(error.message);
  });
});
