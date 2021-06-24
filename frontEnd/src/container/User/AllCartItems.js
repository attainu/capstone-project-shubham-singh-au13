import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PATH from './../../config/webPath';
import {Redirect} from 'react-router-dom'
import LoderOperation from './../../redux/action/Loder/index';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function AllCatItems({history}) {
  const classes = useStyles();
  const [CartItems,setItems]=useState([])
  const TOKEN=useSelector(({Token})=>Token)
  const TYPE=useSelector(({Type})=>Type)
  const dispatch=useDispatch()
  useEffect(()=>{
      if(TOKEN.length>0 && TYPE==='user'){
        dispatch(LoderOperation.show())
    fetch(`http://localhost:2000/user/show/Allmedicine/cart`,{
        headers:{
            token:TOKEN
        }
    }).then(d=>d.json()).then(d=>{
      dispatch(LoderOperation.hide())
      
        setItems(d.data)
    })
}
  },[TOKEN,TYPE,dispatch])


  const REMOVEITEMS=(id)=>{
    dispatch(LoderOperation.show())
    fetch(`http://localhost:2000/user/remove/medicine/cart/${id}`,{
      method:"POST",
      headers:{
        token:TOKEN
      }
    }).then(d=>d.json()).then(d=>{
      dispatch(LoderOperation.hide())
      setItems(CartItems.filter((item)=>item._id!==id))
      
    }).catch(e=>{dispatch(LoderOperation.hide())})
  }
  
  return (
  <>
  {TYPE==='user' && TOKEN.length!==0?
  <div style={{display:'flex',justifyContent:'space-evenly',flexWrap:'wrap'}} >{
    
  CartItems.map((item,i)=>{
    var date = new Date(item?.date);
      return (
        <Card className={classes.root} key={i} style={{margin:'2%'}}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item?.medicineDetail?.photo}
          title={item?.medicineDetail?.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          NAME:{item?.medicineDetail?.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
          BUY DATE:{date.toLocaleString()}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
          Quantity Ordered:{item?.quantity}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
          TOTAL PRICE:{item?.quantity*item?.medicineDetail?.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={()=>history.push(`${PATH.BUYITEM}/${item._id}/${item.medicineDetail._id}`)}>
          BUY
        </Button>
        <Button size="small" color="primary" onClick={()=>{REMOVEITEMS(item._id)}}>
          REMOVE
        </Button>
      </CardActions>
    </Card>
      )
  })
}</div>
  :<Redirect to = {PATH.HOME}></Redirect>}
    </>
  );
}
