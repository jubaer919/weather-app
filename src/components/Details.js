import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import backLogo from '../assets/arrow_back_ios.svg';
import settingLogo from '../assets/cog.svg';
import classes from './Details.module.css';

const Details = () => {
  const weather = useSelector((state) => state.city.selectedCity);
  const navigation = useNavigate();

  function clickHandler() {
    navigation(-1);
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <button type="button" onClick={clickHandler}>
          <img src={backLogo} alt="back logo" className={classes.img} />
        </button>
        <h2>{`${weather.name} weather`}</h2>
        <img src={settingLogo} alt="setting logo" />
      </div>
      <div className={classes.hero}>
        <p className={classes.temperature}>
          <span className={classes['temp-number']}>{Math.round(weather.main.temp - 273.15)}</span>
          <span className={classes.scale}>°C</span>
        </p>
        <p className={classes.description}>{weather.weather[0].description}</p>
      </div>
      <h2 className={classes['heading-secondary']}>{`More details for ${weather.name} weather`}</h2>
      <div className={classes.extra}>
        <p className={classes.dark}>
          <span>Humidity:</span>
          <span>{`${weather.main.humidity}%`}</span>
        </p>
        <p>
          <span>Wind Speed:</span>
          <span>{`${(weather.wind.speed * 3.6).toFixed(2)} km/h`}</span>
        </p>
        <p className={classes.dark}>
          <span>Pressure</span>
          <span>{weather.main.pressure}</span>
        </p>
        <p>
          <span>Visibility:</span>
          <span>{weather.visibility}</span>
        </p>
        <p className={classes.dark}>
          <span>Base:</span>
          <span>{weather.base}</span>
        </p>
      </div>
    </div>
  );
};

export default Details;
