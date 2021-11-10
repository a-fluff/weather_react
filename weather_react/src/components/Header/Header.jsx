import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './Header.module.css';
import store from '../../store/store';
import {IconButton, Button} from '@mui/material';
import ru from '../../assets/icons/ru.svg';
import en from '../../assets/icons/en.svg';

function Header() {
  const location = useSelector((state) =>state.location);
  const langs = {ru, en};
  const [url,setUrl] = useState(langs.en);
  const deg = useSelector((state) => state.deg);  

  function switchLang() {
    let value = 'en';

    if (location === 'en') value = 'ru'
    else if (location === 'ru') value = 'en';

    setUrl(langs[location]);

    store.dispatch({type: 'SET_LANG', value});
  }

  function switchTemp() {
    let value = 'C';

    if(deg === 'C') value = 'F'
    else if(deg === 'F') value = 'C'

    store.dispatch({type: 'SET_DEG', value})
  }

  return (
    <div className={classes.Header}>
      <Button
        onClick={switchLang}
        sx={{ borderRadius: '50%', marginRight: '20px' }}>
          <img src={url} alt={`${url}`}/>
      </Button>
      <IconButton
        className={classes.Header__temp}
        onClick={switchTemp}
        sx={{ color: '#000000', fontSize: 34 }}>
          { deg === 'C' ? 'F°' : 'C°' }
      </IconButton>
    </div>
  )
}

export default Header;