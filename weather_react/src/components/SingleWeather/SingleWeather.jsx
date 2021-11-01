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

  function kelTemp(temp) {
    return (temp - 273.15).toFixed()
  }

  function switchLang() {
    let value = 'en';
    if (location === 'en') value = 'ru'
    else if (location === 'ru') value = 'en';

    store.dispatch({type: 'SET_LANG', value})
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
              </ul>
            </div>
          </CardContent>
        </Card>
      }

      <div>
        <button onClick={switchLang}>{location === 'en' ? 'ru' : 'en'}</button>
      </div>
    </div>
  )
}

export default SingleWeather;