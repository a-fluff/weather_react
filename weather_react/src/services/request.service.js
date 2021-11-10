import store from '../store/store';
import axios from 'axios';
import {createBrowserHistory} from 'history';
import query from './query.service';
import storage from'./storage.service';

let history = createBrowserHistory();

const request = {
  getWeatherFromCity,
  getWeatherFromCoords
}

function getSingleWeather(params, lang) {
  axios.get(`http://api.openweathermap.org/data/2.5/weather${params}&lang=${lang}&appid=${process.env.REACT_APP_API_KEY}`)
  .then((data) => {
        // !
        console.log(data.data.weather[0].main, data.data.sys.country, data.data)
    store.dispatch({type: 'SET_SINGLE_WEATHER', value: data.data});
    store.dispatch({type: 'SET_CITY', value: data.data.name});

    storage.setCityStorage(data.data.name);
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