// user navbar
import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';

import { useHistory } from 'react-router';
import PATH from './../../config/webPath';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function UserMenu() {
  const classes = useStyles();
    const history=useHistory()
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={()=>history.push(PATH.CARTITEMS)}
        className={classes.button}
        startIcon={<ShoppingCartIcon />}
      >
        CART
      </Button>
      {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<AirportShuttleIcon/>}
      >
        ORDERS
      </Button>
      
    </div>
  );
}
