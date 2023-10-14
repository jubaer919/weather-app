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
  const [filteredCities, setFilteredCities] = useState(cities);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  function changeHandler(event) {
    const userInput = event.target.value.toLowerCase();
    const filtered = cities.filter((city) => city.toLowerCase().includes(userInput));
    setFilteredCities(filtered);
    setCityInput(event.target.value);
  }

  function clickHandler(city) {
    dispatch(fetchCityWeather(city))
      .then((response) => {
        if (response.payload) {
          navigation('/details');
        }
      });
  }

  function submitChangeHandler(event) {
    event.preventDefault();
    const userInput = cityInput.trim().toLowerCase();

    if (userInput === '') {
      setFilteredCities(cities);
      return;
    }

    const matchingCities = cities.filter((city) => city.toLowerCase() === userInput);

    if (matchingCities.length === 1) {
      clickHandler(matchingCities[0]);
      setCityInput('');
    }
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
        <form onSubmit={submitChangeHandler}>
          <input
            type="text"
            placeholder="Enter A City"
            value={cityInput}
            onChange={changeHandler}
            className={classes.input}
          />
          <button type="submit" className={classes['serch-btn']}>Search</button>
        </form>
      </div>
      <div className={classes['city-container']}>
        {filteredCities.map((city, index) => {
          const isDark = [0, 3, 4, 7].includes(index);
          const classNames = `${classes.cities} ${isDark ? classes.dark : classes.light}`;

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
