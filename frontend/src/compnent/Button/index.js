// buttons for login and sign UP and logout and See thr profile

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom"
import PATH from './../../config/webPath';
import { useDispatch, useSelector } from 'react-redux';
import VALIDATION from './../../redux/action/Token/index';
import TYPECHECK from './../../redux/action/Type/index';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ContainedButtons() {
  const classes = useStyles();
  const history=useHistory()
  const dispatch=useDispatch()
  const TOKEN=useSelector(({Token})=>Token)
  const LOGOUT=()=>{
    dispatch(VALIDATION.removeToken())
    dispatch(TYPECHECK.removeType())
    history.push(PATH.HOME)
  }
  return (
    <div className={classes.root}>
      {TOKEN.length===0?<>
      <Button variant="contained" color="secondary" onClick={()=>history.push(PATH.SIGNUP)}>
        Signin
      </Button>
      <Button variant="contained" color="primary"  onClick={()=>{history.push(PATH.LOGIN)}}>
        Login
      </Button>
      </>:
      <>
      <Button variant="contained" onClick={()=>history.push(PATH.PROFILE)}>Profile</Button>
      <Button variant="contained" color="primary"  onClick={LOGOUT}>
        Logout
      </Button>
 
      </>
}

    </div>
  );
}
