import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCityWeather } from '../redux/city/citySlice';
import classes from './Home.module.css';
import backLogo from '../assets/arrow_back_ios.svg';
import settingLogo from '../assets/cog.svg';

const cities = ['London', 'Tokyo', 'Rome', 'Madrid', 'Delhi', 'Bali', 'Cairo', 'Sydney'];

const Home = () => {
  const [cityInput, setCityInput] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigate();

  function changeHandeler(event) {
    setCityInput(event.target.value);
  }

  const clickHandler = (city) => {
    dispatch(fetchCityWeather(city))
      .then((response) => {
        if (response.payload) {
          navigation('/details');
        }
      });
  };

  function submitChangeHandeler(event) {
    event.preventDefault();
    if (cityInput.trim() === 0) {
      return;
    }
    clickHandler(cityInput);
    setCityInput('');
  }

  return (
    <div className={classes.container}>
      <div className={classes.nav}>
        <img src={backLogo} alt="back logo" />
        <h3>Weather App</h3>
        <img src={settingLogo} alt="setting logo" />
      </div>
      <div className={classes.header}>
        <h2 className={classes.headding}>Search For Any City Weather</h2>
        <form onSubmit={submitChangeHandeler}>
          <input
            type="text"
            placeholder="Enter A City"
            value={cityInput}
            onChange={changeHandeler}
            className={classes.input}
          />
          <div>
            <button type="submit" className={classes['serch-btn']}>Check Weather</button>
          </div>
        </form>
      </div>
      <h2 className={classes['heading-secondary']}>Check Some Of The City Weather</h2>
      <div className={classes['city-container']}>
        {cities.map((city, index) => {
          const isDark = [1, 2, 5, 6].includes(index);
          const classNames = `${classes.cities} ${isDark ? classes.dark : ''}`;

          return (
            <button
              key={city}
              type="button"
              onClick={() => clickHandler(city)}
              className={classNames}
            >
              <div className={classes.arrow}>&rarr;</div>
              <h1>{city}</h1>
              <p className={classes['btn-des']}>weather</p>
            </button>
          );
        })}

      </div>
    </div>
  );
};

export default Home;
