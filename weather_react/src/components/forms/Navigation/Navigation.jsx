import {Button} from '@mui/material';
import classes from './Navigation.module.css';

function Navigation({getLocation}) {
  return (
    <div className={classes.Navigation}>
      <Button onClick={getLocation}>
        L
      </Button>
    </div>
  )
}

export default Navigation