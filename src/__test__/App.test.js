// Home.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Home from '../components/Home';

const mockStore = configureMockStore([thunk]);

jest.mock('../redux/city/citySlice', () => ({
  fetchCityWeather: jest.fn(),
}));

describe('Home Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      city: {
        selectedCity: null,
        status: 'idle',
        error: null,
      },
    });
  });

  test('renders correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Search For Any City Weather')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter A City')).toBeTruthy();
  });

  test('clicked event fire', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Search For Any City Weather')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter A City')).toBeTruthy();
  });

  test('change the directory', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Search For Any City Weather')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter A City')).toBeTruthy();
  });
});
