import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import SearchInput from '../SearchInput';
import SearchButton from '../SearchButton';
import Navigation from '../Navigation';
import classes from './SearchWrapper.module.css';
import request from '../../../services/request.service';
import store from '../../../store/store';
import storage from '../../../services/storage.service';

function SearchWrapper() {
  const city = useSelector((state) => state.city)

  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.search);
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


  return (
    <div className={classes.SearchWrapper}>
      <SearchInput
        city={city}
        changeCity={setCityInput}
      />

      <Navigation getLocation={getLocationUser}/>

      <SearchButton
        onSubmit={() => {request.getWeatherFromCity(city)}}
      />
    </div>
  )
}

export default SearchWrapper;