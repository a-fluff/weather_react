import { useState } from 'react';
import axios from 'axios';
import SearchInput from '../SearchInput';
import SearchButton from '../SearchButton';
import classes from './SearchWrapper.module.css';

function SearchWrapper() {
  const [city, setCity] = useState('');

  function setCityInput(val) {
    setCity(val);
  }

  function getWeatherCity() {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
    .then((data) => {
      console.log(data)
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