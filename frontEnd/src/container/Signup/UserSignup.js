import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VALIDATION from './../../redux/action/Token/index';
import { Redirect } from 'react-router';
import PATH from './../../config/webPath';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserSignUp() {
  const classes = useStyles();
  const dispatch=useDispatch()
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [Address,setAddress]=useState('')
  const [mobileNumber,setmobileNumber]=useState('')
  const [file,setFile]=useState('')
  const [err,setError]=useState({
      email:'',
      password:'',
      name:'',
      Address:'',
      mobileNo:'',
      msg:''
  })
  const imageUpload=(e)=>{
      setFile(e.target.files[0])
  }
  const TOKENS=useSelector(({Token})=>Token)
  const SubmitDetail=(e)=>{
      e.preventDefault()
      dispatch(LoderOperation.show())
    var data = new FormData()
    data.append('name',name)
    data.append('email',email)
    data.append('password',password)
    data.append('Address',Address)
    data.append('mobileNo',mobileNumber)
    data.append('image',file)
      fetch('http://localhost:2000/user/signup',{
        method: 'POST',
        body: data,
        
      }).then(d=>d.json()).then(d=>{
          
          if(Object.keys(d.err).length>0 || d.msg){
            setError((err)=>({...err,...d.err,...d.msg}))
            dispatch(LoderOperation.hide())
          } 
          else{
            dispatch(VALIDATION.createToken(d.data[0]))
            dispatch(TYPECHECK.getType(d.data[1]))
            dispatch(LoderOperation.hide())
          }
      }).catch(e=>{
        dispatch(VALIDATION.removeToken())
        dispatch(TYPECHECK.removeType())
        dispatch(LoderOperation.hide())
      })

  }
  
  return (
    <>
    {TOKENS.length===0?<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={SubmitDetail}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
                onChange={(e)=>{setName(e.target.value)
                     setError((s)=>({...s,name:'',msg:''}))}}
              />
              <div style={{color:"red"}}>{err.name}</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mobileNo"
                label="Mobile Number"
                name="mobileNo"
                autoComplete="mnumber"
                onChange={(e)=>{
                    setmobileNumber(e.target.value)
                    setError((s)=>({...s,mobileNo:'',msg:''}))
                }
                }
              />
              <div style={{color:"red"}}>{err.mobileNo}</div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e)=>{setEmail(e.target.value)
                    setError((s)=>({...s,email:'',msg:''}))
                }
                }
              />
              <div style={{color:"red"}}>{err.email}</div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>{setPassword(e.target.value)
                    setError((s)=>({...s,password:'',msg:''}))
                }}
              />
              <div style={{color:"red"}}>{err.password}</div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Address"
                label="Address"
                type="text"
                id="Address"
                autoComplete="current-Address"
                onChange={(e)=>{setAddress(e.target.value)
                    setError((s)=>({...s,Address:'',msg:''}))
                }}
              />
              <div style={{color:"red"}}>{err.Address}</div>

            </Grid>
            <Grid item xs={12}>
                <TextField 
                variant="outlined"
                type="file"
                fullWidth
                name='image'
                id="image"
                onChange={imageUpload}
                ></TextField>
                <div style={{color:"red"}}>{err.msg}</div>
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>:<Redirect to={PATH.HOME}></Redirect>}
    </>
  );
}


