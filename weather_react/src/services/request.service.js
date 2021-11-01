import store from '../store/store';
import axios from 'axios';
import {createBrowserHistory} from 'history';
import query from './query.service';

let history = createBrowserHistory();

const request = {
  getWeatherFromCity,
  getWeatherFromCoords
}

function getSingleWeather(params) {
  axios.get(`http://api.openweathermap.org/data/2.5/weather${params}&appid=${process.env.REACT_APP_API_KEY}`)
  .then((data) => {
    store.dispatch({type: 'SET_SINGLE_WEATHER', value: data.data});
    store.dispatch({type: 'SET_CITY', value: data.data.name});

    history.push('?' + query('city', data.data.name));
  })
  .catch((err) => {
    console.log(err);
  })
}

function getWeatherFromCity(city) {
  const param = `?q=${city}`;

  getSingleWeather(param)
}

function getWeatherFromCoords({lat, lon}) {
  const param = `?lat=${lat}&lon=${lon}`;

  getSingleWeather(param);
}

export default request