import {IconButton} from '@mui/material';
import classes from './Navigation.module.css';

function Navigation({getLocation}) {
  return (
    <div className={classes.Navigation}>
      <IconButton className={classes.Navigation_icon} onClick={getLocation}/>
    </div>
  )
}

export default Navigation