import React, { useMemo } from 'react';
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
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import PATH from './../../config/webPath';
import { useEffect } from 'react';
import LoderOperation from './../../redux/action/Loder/index';
import { useDispatch } from 'react-redux';


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

export default function UPDATESHOPKEPERPROFILE({history}) {
  const classes = useStyles();
  const TOKENS=useSelector(({Token})=>Token)
  const USERPROFILE=useSelector(({Profile})=>Profile)
  const [name,setName]=useState(USERPROFILE?.Shoapkeper?.name)
  const [email]=useState(USERPROFILE?.Shoapkeper?.email)
  const [password,setPassword]=useState('')
  const [Address,setAddress]=useState(USERPROFILE?.Shoapkeper?.Address)
  const [mobileNumber]=useState(USERPROFILE?.Shoapkeper?.mobileNo)
  const [shopName,setShopname]=useState(USERPROFILE?.Shoapkeper?.shopName)
  const [file,setFile]=useState('')
  const [err,setError]=useState({msg:''})
  const dispatch=useDispatch()
  const imageUpload=(e)=>{
      setFile(e.target.files[0])
  }
  useEffect(()=>{
        if(!USERPROFILE.Shoapkeper){
            history.push(PATH.PROFILE)
        }
  },[USERPROFILE,history])
  const id=useMemo(()=>{
    return USERPROFILE?.Shoapkeper?._id
  },[USERPROFILE])
  const typeofprofile=useMemo(()=>{
    return USERPROFILE?.Shoapkeper?.type
  },[USERPROFILE])
  const SUBMIT=(e)=>{
      e.preventDefault()
      dispatch(LoderOperation.show())
      var data = new FormData()
        data.append('name',name||USERPROFILE?.Shoapkeper?.name)
        data.append('email',email)
        data.append('password',password)
        data.append('Address',Address||USERPROFILE?.Shoapkeper?.Address)
        data.append('mobileNo',mobileNumber)
        data.append('shopName',shopName||USERPROFILE?.Shoapkeper?.shopName)
        data.append('image',file)
      fetch('http://localhost:2000/shoapkeper/updateprofile',{
        method:"POST",
        body:data,
        headers:{
            token:TOKENS
        }
      }).then(d=>d.json()).then(d=>{
          if(Object.keys(d.err).length!==0){
            dispatch(LoderOperation.hide())
              setError((s)=>({...s,...d.err}))
          }
          else{
            dispatch(LoderOperation.hide())
              history.push(PATH.PROFILE)
          }
      }).catch(e=>dispatch(LoderOperation.hide()))
  }
  return (
    <>
    {TOKENS.length!==0?<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>
        <form className={classes.form} noValidate onSubmit={SUBMIT} >
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
                value={name}
                autoFocus
                onChange={(e)=>{setName(e.target.value)}}
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
                value={mobileNumber}
                autoComplete="mnumber"
                aria-readonly
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id='type'
                label='Type of User'
                name='TYPE'
                value={typeofprofile}
                autoComplete="mnumber"
                aria-readonly
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id='ID'
                label='ID'
                name='ID'
                value={id}
                autoComplete="mnumber"
                aria-readonly
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                autoComplete="email"
                aria-readonly
              />
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
                placeholder="password length grater than 2 than new password will be change"
                autoComplete="current-password"
                onChange={(e)=>{setPassword(e.target.value)
                }}
              />
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
                value={Address}
                autoComplete="current-Address"
                onChange={(e)=>{setAddress(e.target.value)
                }}
              />
              
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="shopName"
                label="shopName"
                type="text"
                id="shopName"
                value={shopName}
                autoComplete="current-password"
                onChange={(e)=>{setShopname(e.target.value)
                }}
              />
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
            Update
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