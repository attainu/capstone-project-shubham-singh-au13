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
import { useMemo } from 'react';
import { useEffect } from 'react';
import PATH from './../../config/webPath';
import { Redirect } from 'react-router';
import INPUTS from './../../compnent/InputTag/index';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function Cart({match,history}) {
  const classes = useStyles();
  const ALLMEDICINE=useSelector(({Allmedicine})=>Allmedicine)
  const TOKEN = useSelector(({Token})=>Token)
  const TYPE = useSelector(({Type})=>Type)
const SINGLEMEDICINE=useMemo(()=>{
    return ALLMEDICINE.filter((i)=>i._id===match.params.id)
},[ALLMEDICINE,match])

useEffect(()=>{
    if(SINGLEMEDICINE.length===0){
        history.push(PATH.HOME)
    }
},[SINGLEMEDICINE,history])

  return (
      <>
      {TOKEN.length!==0 && TYPE==='user' && ALLMEDICINE.length>0?<div style={{display:'flex'
    ,justifyContent:'space-between',margin:'5%'}}>
    <Card className={classes.root}>
      <CardActionArea className={classes.margin}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="240"
          image={SINGLEMEDICINE[0]?.photo}
          title={SINGLEMEDICINE[0]?.name}
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          NAME:{SINGLEMEDICINE[0]?.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
          QUANTITY:{SINGLEMEDICINE[0]?.quantity}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
          PRICE: {SINGLEMEDICINE[0]?.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <INPUTS id={SINGLEMEDICINE[0]?._id} TOKEN={TOKEN}/></div>:<Redirect to = {PATH.HOME}></Redirect>}
    </>
  );
}
