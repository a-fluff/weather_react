import { useSelector } from "react-redux";
import { useState } from "react";
import classes from './SingleWeather.module.css';
import SearchWrapper from "../forms/SearchWrapper";
import {
  Card,
  CardContent
} from '@mui/material';
import l from '../../services/lang.service';
import clear from '../../assets/icons/clear.svg';
import clouds from '../../assets/icons/clouds.svg';
import mist from '../../assets/icons/mist.svg';
import rain from '../../assets/icons/rain.svg';
import storm from '../../assets/icons/storm.svg';
import snow from '../../assets/icons/snow.svg';
import Navigation from '../Navigation';
import request from "../../services/request.service";

function SingleWeather() {
  const singleWeather = useSelector((state) => state.single_weather);
  const location = useSelector((state) =>state.location);
  const deg = useSelector((state) => state.deg);

  function kelTemp(temp) {
    let resultTemp = '';

    if(deg === 'F') {
      resultTemp = `${((temp - 273.15) * 9/5 + 32).toFixed()} ${deg}°`
    } else if (deg === 'C') {
      resultTemp = `${(temp - 273.15).toFixed()} ${deg}°`
    } else {
      resultTemp = `${temp.toFixed()} K°`
    }

    if((resultTemp.slice(0, -2) == 0) && (resultTemp.charAt(0) == '-')) {
      return resultTemp.slice(1)
    } else {
      return resultTemp
    }
  }

  function getTodaysDate({location}, sec, offset) {
    let options = {day: 'numeric', month: 'long', weekday: 'long', hour: 'numeric', minute: 'numeric'};
    let currentDate = new Date((sec + offset - 10800)*1000);
    
    return currentDate.toLocaleDateString(`${location}`, options)
  }

  function getLocationUser() {
    if(navigator) {
      navigator.geolocation.getCurrentPosition((position) => { 

        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }

        request.getWeatherFromCoords(coords)
      });
    } else {
      console.log('Error navigator');
    }
  }

  function windDirection(wDeg) {
    let result = '';

    if(wDeg >= 10 && wDeg <= 80) result = 'NE'
    else if(wDeg >= 81 && wDeg <= 100) result = 'E'
    else if(wDeg >= 101 && wDeg <= 170) result = 'SE'
    else if(wDeg >= 171 && wDeg <= 190) result = 'S'
    else if(wDeg >= 191 && wDeg <= 260) result = 'SW'
    else if(wDeg >= 261 && wDeg <= 280) result = 'W'
    else if(wDeg >= 281 && wDeg <= 350) result = 'NW'
    else if(wDeg <= 10 || wDeg >= 351 ) result = 'N'

    return result;
  }

  function weatherType(weather) {
    if(weather === 'Clear') {
      return clear
    } else if(weather === 'Clouds') {
      return clouds
    } else if(weather === 'Mist') {
      return mist
    } else if(weather === 'Rain') {
      return rain
    } else if(weather === 'Storm') {
      return storm
    } else if(weather === 'Snow') {
      return snow
    }

    
    // store.dispatch({type: 'SET_WEATHER', value);
  }

  function getSunriseTime(sec, offset) {
    return new Date((sec + offset)*1000).toUTCString().slice(-12, -7);
  }

  function getSunsetTime(sec, offset) {
    return new Date((sec + offset)*1000).toUTCString().slice(-12, -7);
  }

  return (
    <div className={classes.SingleWeather}>
      <SearchWrapper/>
      {
        singleWeather && 
        <div>
          <div className={classes.SingleWeather__header}>
            <Navigation getLocation={getLocationUser}/>
            <div className={classes.SingleWeather__title}>
                <h1 className={classes.SingleWeather__city}>
                  {singleWeather.name}, {singleWeather.sys.country}
                </h1>
              <p>
                {getTodaysDate({location}, singleWeather.dt, singleWeather.timezone)}
              </p>
            </div>
          </div>

          <Card className={classes.SingleWeather__card} sx={{ bgcolor: 'rgba(225, 225, 225, 0.8)' }}>
            <CardContent className={classes.SingleWeather__content}>
              <div>
                <img
                  className={classes.SingleWeather__img}
                  src={weatherType(singleWeather.weather[0].main)}
                  alt={singleWeather.weather[0].main}
                />
              </div>
              <div className={classes.SingleWeather__description}>
                <p className={classes.SingleWeather__temp}>
                  {kelTemp(singleWeather.main.temp)}
                </p>
                <p className={classes.SingleWeather__weather}>
                  {l(singleWeather.weather[0].main.toLowerCase())}
                </p>
              </div>
            </CardContent>

            <CardContent className={classes.SingleWeather__content}>
                <ul className={classes.SingleWeather__params}>
                  <div className={classes.SingleWeather__section}>
                    <li className={classes.SingleWeather__param}>
                      {kelTemp(singleWeather.main.temp_max)}
                      <span>{l('max_temp')}</span>
                    </li>
                    <li className={classes.SingleWeather__param}>
                      {kelTemp(singleWeather.main.temp_min)}
                      <span>{l('min_temp')}</span>
                    </li>
                  </div>
                  <div className={classes.SingleWeather__section}>
                    <li className={classes.SingleWeather__param}>
                    {singleWeather.wind.speed.toFixed()} {l('speed')}, {l(`${windDirection(singleWeather.wind.deg)}`)}
                      <span>{l('wind')}</span>
                    </li>
                    <li className={classes.SingleWeather__param}>
                      {`${singleWeather.main.humidity}%`}
                      <span>{l('humidity')}</span>
                    </li>
                  </div>
                  <div className={classes.SingleWeather__section}>
                    <li className={classes.SingleWeather__param}>
                      {getSunriseTime(singleWeather.sys.sunrise, singleWeather.timezone)}
                      <span>{l('sunrise')}</span>
                    </li>
                    <li className={classes.SingleWeather__param}>
                      {getSunsetTime(singleWeather.sys.sunset, singleWeather.timezone)}
                      <span>{l('sunset')}</span>
                    </li>
                  </div>
                </ul>
            </CardContent>
          </Card>
        </div>
      }

      <div>
        {/* <button onClick={switchLang}>{location === 'en' ? 'ru' : 'en'}</button> */}
        {/* <button onClick={switchTemp}>{ deg === 'C' ? 'F°' : 'C°' }</button> */}
      </div>
    </div>
  )
}

export default SingleWeather;