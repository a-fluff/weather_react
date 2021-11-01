import {TextField} from '@mui/material';
import l from '../../../services/lang.service';

function SearchInput({city, changeCity}) {
  return (
    <TextField
      size="large"
      label={l("city")}
      value={city}
      placeholder="Minsk"
      onChange={(e) => {changeCity(e.target.value)}}
    />
  )
}
export default SearchInput;