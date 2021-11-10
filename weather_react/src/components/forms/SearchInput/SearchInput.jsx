import {TextField} from '@mui/material';
import l from '../../../services/lang.service';
import classes from './SearchInput.module.css';

function SearchInput({city, changeCity}) {
  return (
    <TextField
      className={classes.TextField__input}
      style={{ display: 'flex' }}
      label={l("city")}
      value={city}
      placeholder="Minsk"
      onChange={(e) => {changeCity(e.target.value)}}
    />
  )
}
export default SearchInput;