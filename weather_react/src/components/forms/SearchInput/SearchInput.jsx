import {TextField} from '@mui/material';

function SearchInput({city, changeCity}) {
  return (
    <TextField
      size="large"
      label="City"
      value={city}
      placeholder="Minsk"
      onChange={(e) => {changeCity(e.target.value)}}
    />
  )
}
export default SearchInput;