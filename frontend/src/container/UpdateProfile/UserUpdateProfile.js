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

export default function USERUPDATEPROFILE({history}) {
  const classes = useStyles();
  const TOKENS=useSelector(({Token})=>Token)
  const USERPROFILE=useSelector(({Profile})=>Profile)
  const [name,setName]=useState(USERPROFILE?.currentUser?.name)
  const [email]=useState(USERPROFILE?.currentUser?.email)
  const [password,setPassword]=useState('')
  const [Address,setAddress]=useState(USERPROFILE?.currentUser?.Address)
  const [mobileNumber]=useState(USERPROFILE?.currentUser?.mobileNo)
  const [file,setFile]=useState('')
  const [err,setError]=useState({
      msg:''
  })
  const dispatch=useDispatch()
  const imageUpload=(e)=>{
      setFile(e.target.files[0])
  }
  useEffect(()=>{
        if(!USERPROFILE.currentUser){
            history.push(PATH.PROFILE)
        }
  },[USERPROFILE,history])
//   const {type,_id}=USERPROFILE.currentUser
  const SUBMIT=(e)=>{
      e.preventDefault()
      dispatch(LoderOperation.show())
      var data = new FormData()
        data.append('name',name||USERPROFILE?.currentUser?.name)
        data.append('email',email)
        data.append('password',password)
        data.append('Address',Address||USERPROFILE?.currentUser?.Address)
        data.append('mobileNo',mobileNumber)
        data.append('image',file)
      fetch('http://localhost:2000/user/updateprofile',{
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


// const SubmitDetail=(e)=>{
//     e.preventDefault()
//   var data = new FormData()
//   data.append('name',name)
//   data.append('email',email)
//   data.append('password',password)
//   data.append('Address',Address)
//   data.append('mobileNo',mobileNumber)
//   data.append('image',file)
//     fetch('http://localhost:2000/user/signup',{
//       method: 'POST',
//       body: data,
      
//     }).then(d=>d.json()).then(d=>{
        
//         if(Object.keys(d.err).length>0 || d.msg){
//           setError((err)=>({...err,...d.err,...d.msg}))
//         } 
//         else{
//           dispatch(VALIDATION.createToken(d.data[0]))
//           dispatch(TYPECHECK.getType(d.data[1]))
//         }
//     }).catch(e=>{
//       dispatch(VALIDATION.removeToken())
//       dispatch(TYPECHECK.removeType())
//     })

// }