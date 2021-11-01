import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchInput from '../SearchInput';
import SearchButton from '../SearchButton';
import classes from './SearchWrapper.module.css';
import store from '../../../store/store';

function SearchWrapper() {
  const [city, setCity] = useState('');

  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.search);
    let queryCity = urlParams.get('city');

    if(queryCity) {
      setCityInput(queryCity)
      getWeatherCity(queryCity)
    }
  }, [])

  function setCityInput(val) {
    setCity(val);
  }

  function getWeatherCity(searchCity) {
    // const requestCity = searchCity ? searchCity : city;

    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
    .then((data) => {
      store.dispatch({type: 'SET_SINGLE_WEATHER', value: data.data})
    })
    .catch((err) => {
      console.log(err);
    })
  }


  return (
    <div className={classes.SearchWrapper}>
      <SearchInput
        city={city}
        changeCity={setCityInput}
      />

      <SearchButton
        onSubmit={getWeatherCity}
      />
    </div>
  )
}

export default SearchWrapper;