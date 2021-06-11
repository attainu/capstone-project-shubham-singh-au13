
// const AllMedicineOfSingleAdmin=()=>{

// }
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PATH from './../../config/webPath';
import SingleAdminMedicine from './../../redux/action/Shopkeper/singleUserMedicine';
import { useDispatch } from 'react-redux';
import LoderOperation from './../../redux/action/Loder/index';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function AllMedicineOfSingleAdmin({history}) {
  const classes = useStyles();
  const TOKEN=useSelector(({Token})=>Token)
  const TYPE=useSelector(({Type})=>Type)
  const [MEDICINE,setMedicine]=useState([])
  const dispatch=useDispatch()
  useEffect(()=>{
      if(TOKEN.length>0 && TYPE==='shopkeper'){
        dispatch(LoderOperation.show())
        fetch('http://localhost:2000/shoapkeper/single/allmedicine',{
            headers:{
                token:TOKEN
            }
        }).then(d=>d.json()).then(d=>{
            // console.log(d)
            if(Object.keys(d.err).length>0){
              dispatch(LoderOperation.hide())

            }else{
                setMedicine(s=>(d.data[0].medicine))
                dispatch(SingleAdminMedicine.AddMedicines(d.data[0].medicine))
                dispatch(LoderOperation.hide())
            }
        })}
        else{
            history.push(PATH.HOME)
            dispatch(LoderOperation.hide())
            dispatch(SingleAdminMedicine.deletemedicine())
        }
  },[TOKEN,TYPE,history,dispatch])
  return (
    <>
    <div style={{display:'flex',margin:'2%' ,flexWrap:'wrap',justifyContent:'space-between'}}>
    {MEDICINE.map((item,i)=>{
        return (
    <Card className={classes.root} key={i} onClick={()=>{history.push(`${PATH.UPDATEMEDICINE}/${item._id}`)}}>
      <CardMedia
        className={classes.media}
        image={item.photo}
        title={item.name}
      />
      <CardContent>
      <Typography paragraph>
            NAME :{item.name}
          </Typography>

        <Typography paragraph>
            PRICE OF ONE MEDICINE:{item.price}
          </Typography>
          <Typography paragraph>
              QUANTITY OF ONE MEDICINE:{item.quantity}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          LAST UPDATED DATE:{item.date}
        </Typography>
      </CardContent>
    </Card>
        )
    })}
    </div>
    </>
  );
}
