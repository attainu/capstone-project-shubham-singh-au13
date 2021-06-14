import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PATH from './../../config/webPath';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Bill({match}) {
  const classes = useStyles();
  const TOKEN=useSelector(({Token})=>Token)
  const TYPE=useSelector(({Type})=>Type)
  const id=match.params.id
  const [data,setData]=useState([])
  const dispatch=useDispatch()
    useEffect(()=>{
        fetch(`http://localhost:2000/user/odered/recipt/${id}`,{
            headers:{
                token:TOKEN
            }
        }).then(d=>d.json()).then(d=>{
            setData(d.data)
        })
    },[dispatch,id,TOKEN])
    // console.log(data)
  return (
      
    <React.Fragment>
        {TOKEN?.length && TYPE==='user'?<>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <div style={{display:'flex',justifyContent:'space-between',margin:'2%'}}>
          <h3>{data?.length?data[2]?.medicineDetail?.name:null}</h3>
          <h3>{data?.length?data[1]?.orderedMedicine?.quantity:null}</h3>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',margin:'2%'}}>
          <h3>TOTEL</h3>
          <h3>{data?.length?data[2]?.medicineDetail?.price*data[1]?.orderedMedicine?.quantity:null}</h3>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>NAME:{data?.length?data[0]?.userDetail?.name:null}</Typography>
          <Typography gutterBottom>EMAIL:{data?.length?data[0]?.userDetail?.email:null}</Typography>
          <Typography gutterBottom>MOBILE NO:{data?.length?data[0]?.userDetail?.mobileNo:null}</Typography>
          <Typography gutterBottom>DELIVERY ADDRESS:{data?.length?data[1]?.orderedMedicine?.Address:null}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
        <Typography variant="h6" gutterBottom className={classes.title}>
            Shop Keper Detail
          </Typography>
          <Typography gutterBottom>NAME:{data?.length?data[3]?.shopkeperDetail?.name:null}</Typography>
          <Typography gutterBottom>NAME:{data?.length?data[3]?.shopkeperDetail?.email:null}</Typography>
          <Typography gutterBottom>NAME:{data?.length?data[3]?.shopkeperDetail?.shopName:null}</Typography>
          <Typography variant="h6" gutterBottom className={classes.title}>
            CASH ON DELIVERY
          </Typography>
        </Grid>
      </Grid></>:<Redirect to ={PATH.HOME}></Redirect>
}
    </React.Fragment>
  );
}