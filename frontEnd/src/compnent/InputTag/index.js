// use to take the quantity as input which medicine user want to buy

import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import LoderOperation from './../../redux/action/Loder/index';
import PATH from './../../config/webPath';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  buttons:{
        '& > *': {
          margin: theme.spacing(1),
        },
  }
}));

export default function INPUTS({id,TOKEN}) {
  const classes = useStyles();
  const [quantity,setQuantity]=useState(1)
  const [err,setError]=useState({msg:'',quantity:''})
  const history=useHistory()
  const dispatch=useDispatch()

  const SUBMIT=(e)=>{
      e.preventDefault()
        dispatch(LoderOperation.show())
      fetch(`http://localhost:2000/user/add/medicine/cart/${id}`,{
          method:"POST",
          headers:{
              token:TOKEN,
              'Content-Type':'application/JSON'
          },
          body:JSON.stringify({quantity:quantity>0?quantity:1})
      }).then(d=>d.json()).then(d=>{
          dispatch(LoderOperation.hide())
          if(Object.keys(d.err).length>0){
              setError((s)=>({...s,...d.err}))
          }
          else{
              history.push(PATH.CARTITEMS)
          }
      })
  }
  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={SUBMIT}>
      <TextField id="filled-basic" type="number" label="Quantity" variant="filled" onChange={
          (e)=>{setQuantity(e.target.value)
            setError({msg:'',quantity:''})
        }}
      />
      <div>{err.quantity}</div>
      <div>{err.msg}</div>
      <div className={classes.buttons}>
      <Button variant="contained" color="secondary" type='submit'>
        Secondary
      </Button>
      </div>
      
    </form>
  );
}
