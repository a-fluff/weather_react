import { useSelector } from "react-redux";
import classes from './SingleWeather.module.css';
import SearchWrapper from "../forms/SearchWrapper";
import {
  Card,
  CardContent
} from '@mui/material';
import store from "../../store/store";
import l from '../../services/lang.service'

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

    return resultTemp
  }

  function switchLang() {
    let value = 'en';
    if (location === 'en') value = 'ru'
    else if (location === 'ru') value = 'en';

    store.dispatch({type: 'SET_LANG', value})
  }

  function switchTemp() {
    let value = 'C';

    if(deg === 'C') value = 'F'
    else if(deg === 'F') value = 'C'

    store.dispatch({type: 'SET_DEG', value})
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

  return (
    <div className={classes.SingleWeather}>
      <SearchWrapper/>

      {
        singleWeather && 
        <Card className={classes.SingleWeather__card}>
          <CardContent>
            <div>
              IMG
            </div>
            <div>
              <ul className={classes.SingleWeather__params}>
                <li className={classes.SingleWeather__param}>
                  <span>{l('temp')}</span>{kelTemp(singleWeather.main.temp)}
                </li>
                <li className={classes.SingleWeather__param}>
                  <span>{l('max_temp')}</span>{kelTemp(singleWeather.main.temp_max)}
                </li>
                <li className={classes.SingleWeather__param}>
                  <span>{l('min_temp')}</span>{kelTemp(singleWeather.main.temp_min)}
                </li>
                <li className={classes.SingleWeather__param}>
                  <span>{l('wind_direction')}</span>{windDirection(singleWeather.wind.deg)}
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      }

      <div>
        <button onClick={switchLang}>{location === 'en' ? 'ru' : 'en'}</button>
        <button onClick={ switchTemp }>{ deg === 'C' ? 'F°' : 'C°' }</button>
      </div>
    </div>
  )
}

export default SingleWeather;