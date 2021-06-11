// LOGIN PAGE FOR USER AND SHOP KEPER

import React, { useMemo } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect, useHistory, useLocation } from 'react-router';
import PATH from '../../config/webPath';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VALIDATION from '../../redux/action/Token/index';
import TYPECHECK from './../../redux/action/Type/index';
import LoderOperation from './../../redux/action/Loder/index';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function LOGIN() {
    const classes = useStyles();
    const history=useHistory()
    const location=useLocation()
    const dispatch=useDispatch()
    const TOKENS=useSelector(({Token})=>Token)
    const url=useMemo(()=>{
        if(location.pathname===PATH.USERLOGIN){
            return 'http://localhost:2000/user/login'
        }else{
            return 'http://localhost:2000/shoapkeper/login'
        }
    },[location])
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [err,setError]=useState('')
    const SUBMIT=(e)=>{
        e.preventDefault()
        dispatch(LoderOperation.show())
        fetch(url,{
            method:"POST",
            body:JSON.stringify({email:email,password:password}),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(d=>d.json()).then(d=>{
          dispatch(LoderOperation.hide())
            if(Object.keys(d.err).length>0){
                setError(d.err.msg)
            }
            else{
                dispatch(VALIDATION.createToken(d.data[0]))
                dispatch(TYPECHECK.getType(d.data[1]))
                history.push(PATH.HOME)
            }
        }).catch(e=>{
          dispatch(LoderOperation.hide())
            dispatch(VALIDATION.removeToken())
            dispatch(TYPECHECK.removeType())
            history.push(PATH.HOME)
            console.log(e)
        })
    }

  return (
      <>
      {TOKENS.length===0?
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={SUBMIT}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <div style={{color:'red',textAlign:"center"}}>{err}</div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>:<Redirect to={PATH.HOME}></Redirect>}
    </>
  );
}