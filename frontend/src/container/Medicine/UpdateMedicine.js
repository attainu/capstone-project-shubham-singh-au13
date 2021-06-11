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
import { useMemo } from 'react';
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

export default function UPDATEMEDICINE({history,location,match}) {
  const classes = useStyles();
  const AllMedicine=useSelector(({SingleAdminMedicine})=>SingleAdminMedicine)
  const TOKEN=useSelector(({Token})=>Token)
  const TYPE=useSelector(({Type})=>Type)
  const dispatch=useDispatch()
  const CurrentMedicines=useMemo(()=>{
      return AllMedicine.filter(i=>i._id===match.params.id)
  },[match,AllMedicine])
  const [name]=useState(CurrentMedicines[0]?.name)
  const [price,setPrice]=useState(CurrentMedicines[0]?.price)
  const [quantity,setQuantity]=useState(CurrentMedicines[0]?.quantity)
  const TOKENS=useSelector(({Token})=>Token)
  const SubmitDetail=(e)=>{
      e.preventDefault()
      dispatch(LoderOperation.show())
      fetch(`http://localhost:2000/shoapkeper/update/medicine/${CurrentMedicines[0]._id}`,{
          method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'token':TOKENS
        },
        body:JSON.stringify({price:price||CurrentMedicines[0]?.price,quantity:quantity||CurrentMedicines[0]?.quantity})
      }).then(d=>d.json()).then(d=>{
          if(Object.keys(d.err).length>0){
            dispatch(LoderOperation.hide())
              history.push(PATH.HOME)
          }
          else{
            dispatch(LoderOperation.hide())
            history.push(PATH.ALLMEDICINEOFSINGLEADMIN)
          }
      }).catch(e=>dispatch(LoderOperation.hide()))
     
  }
  useEffect(()=>{
    if(CurrentMedicines.length===0){
        history.push(PATH.ALLMEDICINEOFSINGLEADMIN)
    }
  },[CurrentMedicines,history])
  return (
    <>
    {TOKEN.length>0 && TYPE==='shopkeper'?<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Medicine
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
                value={name}
                aria-readonly
                ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="price"
                label="Pricee of Single medicine"
                name="price"
                autoComplete="price"
                value={price}
                onChange={(e)=>{
                    setPrice(e.target.value)
                }
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="quantity"
                label="Quantity on Medicine"
                name="quantity"
                autoComplete="quantity"
                value={quantity}
                onChange={(e)=>{setQuantity(e.target.value)
                   
                }
                }
              />
            </Grid>
            <Grid item xs={12}>
            
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
    </Container>:<Redirect to = {PATH.HOME}></Redirect>}
    </>
  );
}


