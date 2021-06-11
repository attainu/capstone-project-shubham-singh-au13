// LODER WhICH POPUP BEFORE API CALL
import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function LODER() {
  const classes = useStyles();
  const Loder=useSelector(({Loder})=>Loder)

  return (
    <div>
      <Backdrop className={classes.backdrop} open={Loder}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
