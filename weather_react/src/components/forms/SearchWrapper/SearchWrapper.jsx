import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import SearchInput from '../SearchInput';
import SearchButton from '../SearchButton';
import classes from './SearchWrapper.module.css';
import request from '../../../services/request.service';
import store from '../../../store/store';
import storage from '../../../services/storage.service';

function SearchWrapper() {
  const city = useSelector((state) => state.city)

  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.search);
    // console.log('!!!!!', urlParams)
    let queryCity = urlParams.get('city');

    if(queryCity) {
      setCityInput(queryCity)

      storage.setCityStorage(queryCity)
      request.getWeatherFromCity(queryCity)
    } else {
      const cityStorage = storage.getCityStorage()

      setCityInput(cityStorage)
      request.getWeatherFromCity(cityStorage)
    }
  }, [])

  function setCityInput(val) {
    store.dispatch({ type: 'SET_CITY', value: val })
  }


  return (
    <div className={classes.SearchWrapper}>
      <SearchInput
        city={city}
        changeCity={setCityInput}
      />

      <SearchButton
        onSubmit={() => {request.getWeatherFromCity(city)}}
      />
    </div>
  )
}

export default SearchWrapper;