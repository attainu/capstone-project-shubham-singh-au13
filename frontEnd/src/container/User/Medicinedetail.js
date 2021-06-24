// showing detail of medicine  to user
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import PATH from './../../config/webPath';
import { useEffect } from 'react';
import LoderOperation from './../../redux/action/Loder/index';
import { useDispatch } from 'react-redux';
const useStyles = makeStyles({
  root: {
    maxWidth: 845,
  }, center:{
    position: 'scroll',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:'1%'
  },
});

export default function MedicineDetail({location,match,history}) {
  const classes = useStyles();
    const TOKEN=useSelector(({Token})=>Token)
    const TYPE=useSelector(({Type})=>Type)
    const ID=match.params.id
    const [Details,setDetails]=useState([])
    const dispatch=useDispatch()
    useEffect(()=>{
      
        if(TYPE==="user" && TOKEN.length!==0){
        dispatch(LoderOperation.show())
        fetch(`http://localhost:2000/user/medicine/detail/${ID}`,{
            headers:{
                token:TOKEN
            }
        }).then(d=>d.json()).then(d=>{
            dispatch(LoderOperation.hide())
            if(Object.keys(d.err).length>0){
                history.push(PATH.HOME)
            }else{
                setDetails([...d.data])
                
            }
        }).catch(e=>{
            dispatch(LoderOperation.hide())
            history.push(PATH.HOME)

        })
    }
    else{
        history.push(PATH.HOME)
    }
    },[ID,dispatch,history,TOKEN,TYPE])
  return (
      <>
      {TYPE==='user' && TOKEN.length>0?
    <Card className={`${classes.root} ${classes.center}`}>
      <CardActionArea style={{display:'flex'}}>
        <CardMedia
          component="img"
          alt="MEDICINE IMAGE"
          height="240"
          image={Details?.[0]?.medicine?.photo}
          title="MEDICINE IMAGE"
        />
        <CardContent style={{width:'100%'}}>
          <Typography gutterBottom variant="h5" component="span" style={{display:'block'}}>
         {`Medicine Name:`+Details?.[0]?.medicine?.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="span"  style={{display:'block'}}>
           Quantity Of Medicine :{Details?.[0]?.medicine?.quantity}
          </Typography>
          <Typography gutterBottom variant="h5" component="span"  style={{display:'block'}}>
           Price Of Single Medicine :{Details?.[0]?.medicine?.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <h1 style={{textAlign:'center'}}>Sheller Details</h1>
      <div style={{display:'flex',justifyContent:'center'}}>
          <Typography variant="body2" color="textSecondary" component="span"  style={{display:'block'}}>
            <Typography gutterBottom variant="h5" component="span"  style={{display:'block'}}>
           Sheller Of Medicine :{Details?.[1]?.shopkeper?.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="span"  style={{display:'block'}}>
           Sheller ID :{Details?.[1]?.shopkeper?.email}
          </Typography>
          <Typography gutterBottom variant="h5" component="span"  style={{display:'block'}}>
           Sheller Of Shop Name :{Details?.[1]?.shopkeper?.shopName}
          </Typography>
          <Typography gutterBottom variant="h5" component="span"  style={{display:'block'}}>
           Sheller Of Shop Address :{Details?.[1]?.shopkeper?.Address}
          </Typography>
          </Typography>
        </div>
      <CardActions style={{display:'flex',justifyContent:'center'}}>
        <Button size="small"  variant="contained" color="secondary" onClick={()=>{history.push(`${PATH.DYNAMICCARTROUTE}/${Details?.[0]?.medicine?._id}`)}}>
          Buy
        </Button>
      </CardActions>
    </Card>:<Redirect to = {PATH.HOME}></Redirect>
}
    </>
  );
}
