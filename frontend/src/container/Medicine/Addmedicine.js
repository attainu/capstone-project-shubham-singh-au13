import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import {useState} from 'react'
import PATH from './../../config/webPath';
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
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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

export default function AddingMedicine({history}) {
  const classes = useStyles();
    const TOKEN=useSelector(({Token})=>Token)
    const TYPE=useSelector(({Type})=>Type)
    const dispatch=useDispatch()
    const [name,setName]=useState('')
    const [quantity,setQuantity]=useState('')
    const [price,setPrice]=useState('')
    const [image,setImage]=useState('')
    const [err,setError]=useState({
      name:'',
      price:'',
      quantity:'',
      photo:'',
      msg:''
    })
    const SUBMIT=(e)=>{
      e.preventDefault()
      var data = new FormData()
      data.append('name',name)
      data.append('quantity',quantity)
      data.append('price',price)
      data.append('image',image)
      dispatch(LoderOperation.show())
      fetch('http://localhost:2000/shoapkeper/addmedicine',{
        method:'POST',
        headers:{
          token:TOKEN
        },
        body:data
      }).then(d=>d.json()).then(d=>{
        if(Object.keys(d.err).length>0){
          dispatch(LoderOperation.hide())
          setError((s)=>({...s,...d.err}))
        }
        else{
          dispatch(LoderOperation.hide())
          history.push(PATH.ALLMEDICINEOFSINGLEADMIN)
        }
      }).catch(e=>{
        dispatch(LoderOperation.hide())
        history.push(PATH.HOME)
        console.log(e)
      })
    }
    const UPLOADIMAGE=(e)=>{
      setImage(e.target.files[0])
      setError((s)=>({...s,msg:'',photo:''}))
    }

  return (
      <>
      {TOKEN.length>0 && TYPE==='shopkeper'?
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ADD MEDICINE
          </Typography>
          <form className={classes.form} noValidate onSubmit={SUBMIT}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Medicine Name"
              name="name"
              type="text"
              autoComplete="name"
              autoFocus
              onChange={(e)=>{setName(e.target.value)
                setError((s)=>({...s,name:''}))
              }}
            />
            <div style={{color:'red'}}>{err.name}</div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="quantity"
              label="Total Medicine"
              name="quantity"
              type="number"
              autoComplete="quantity"
              autoFocus
              onChange={(e)=>{setQuantity(e.target.value)
                setError((s)=>({...s,quantity:''}))}}
            />
            <div style={{color:'red'}}>{err.quantity}</div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="price"
              label="Single Medicine Price"
              name="price"
              type="number"
              autoComplete="price"
              autoFocus
              onChange={(e)=>{setPrice(e.target.value)
                setError((s)=>({...s,price:''}))
              }}
            />
            <div style={{color:'red'}}>{err.price}</div>
            <TextField 
                variant="outlined"
                type="file"
                fullWidth
                name='image'
                id="image"
                onChange={UPLOADIMAGE}
                >
        
            </TextField>
            <div style={{color:'red'}}>{err.photo}</div>
            <div style={{color:'red'}}>{err.msg}</div>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              ADD
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>:<Redirect to ={PATH.HOME}></Redirect>}
    </>
  );
}