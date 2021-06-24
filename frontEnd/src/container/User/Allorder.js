import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PATH from './../../config/webPath';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LoderOperation from './../../redux/action/Loder/index';

const useStyles = makeStyles({
  root: {
    maxWidth: 455,
  },
});

export default function Orders() {
  const classes = useStyles();
  const TOKEN=useSelector(({Token})=>Token)
  const TYPE=useSelector(({Type})=>Type)
  const [data,setData]=useState([])
  const dispatch=useDispatch()
  useEffect(()=>{
    if(TOKEN?.length && TYPE==='user'){
    dispatch(LoderOperation.show())
    fetch('http://localhost:2000/user/all/orders',{
        headers:{
            token:TOKEN
        }
    }).then(d=>d.json()).then(d=>{
        dispatch(LoderOperation.hide())
        setData(d.data)
    }).catch(e=>dispatch(LoderOperation.hide()))
}
  },[dispatch,TOKEN,TYPE])
  
  return (
      <>
      {TOKEN?.length && TYPE==='user'?
      <div style={{display:'flex',justifyContent:'space-evenly',flexWrap:'wrap'}}>
      {data.map((item,i)=>{
          let date= new Date(item?.buydetail?.date)
          return (
            <Card className={classes.root} key={i} style={{margin:'2%'}}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="160"
                image={item?.medicine?.photo}
                title="medicine Image"
              />
              <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                    DATE : {date.toLocaleString()}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    MEDICINE NAME: {item?.medicine?.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    TOTAL QUANTITIY: {item?.buydetail?.quantity}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    TOTAL PRICE: {item?.buydetail?.quantity * item?.medicine?.price }
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    DELIVERY ADDRESS: {item?.buydetail?.address }
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    BUYER NAME : {item?.userDetail?.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    BUYER email : {item?.userDetail?.email}
                </Typography>                <Typography variant="body2" color="textSecondary" component="p">
                    BUYER MOBILE NO : {item?.userDetail?.mobileNo}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          )
      })}
      
    
    </div>:<Redirect to ={PATH.HOME}></Redirect>}
    </>
  );
}
