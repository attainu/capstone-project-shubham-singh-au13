import PATH from './../../config/webPath';
import { useDispatch, useSelector } from 'react-redux';
import {useState} from "react"
import LoderOperation from './../../redux/action/Loder/index';
import { Redirect } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));
const Buy=({history,match,location})=>{
    const dispatch=useDispatch()
    const TOKEN=useSelector(({Token})=>Token)
    const TYPE=useSelector(({Type})=>Type)
    const [err,setError]=useState({msg:''})
    const [address,setAddress]=useState('')
    const classes = useStyles();

    const Submit=(e)=>{
        e.preventDefault()
        dispatch(LoderOperation.show())
        fetch(`http://localhost:2000/user/buy/medicine/${match.params.cart}/${match.params.medicine}`,{
            method:'POST',
            headers:{
                token:TOKEN,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({address})
        }).then(d=>d.json()).then(d=>{
            dispatch(LoderOperation.hide())
            if(Object.keys(d.err).length>0){
                setError((s)=>({...d.err}))
            }
            else{
                history.push(`${PATH.RECIPT}/${match.params.cart}`)
            }
        }).catch(e=>dispatch(LoderOperation.hide()))
        
    }
    return (
        <>
        {TOKEN?.length && TYPE==='user'?
        err.msg.length>0?<h1>{err.msg}</h1>:
        <>
            <form onSubmit={Submit}>
            <div className={classes.root}>
        <TextField
          id="standard-full-width"
          label="Dilevery Address"
          style={{ margin: 8 }}
          placeholder="Dilevery Address"
          helperText="Dilevery Address"
          fullWidth
          margin="normal"
          onChange={(e)=>{setAddress(e.target.value)}}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="secondary"  type="submit">  Submit</Button >
        </div>
                
            </form>
        </>
        :<Redirect to={PATH.HOME}></Redirect>}
        </> 
    )
}
export default Buy


