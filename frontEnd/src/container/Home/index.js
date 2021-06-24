import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AllMedicines from './../../redux/action/AllMedicine/index';
// import LoderOperation from './../../redux/action/Loder/index';
import "./style.css"
import Models from './../../compnent/Modal'
import PATH from './../../config/webPath';
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
const Home =({history})=>{
  const [open,setOpen]=useState(false)
  const handleOpen = (e) => {
    setOpen(true);
    e.stopPropagation()
  };

  const handleClose = (e) => {
    setOpen(false);
    e.stopPropagation()
  };
    const classes = useStyles();
    const MEDICINE=useSelector(({Allmedicine})=>Allmedicine)
    const TYPE=useSelector(({Type})=>Type)
    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(AllMedicines.showMedicine())
    },[dispatch])
    const DETAIL=(id)=>{
     history.push(`${PATH.MEDICINEDETAIL}/${id}`)
    }
    return (
        <>
        <div style={{display:'flex',margin:'2%' ,flexWrap:'wrap',justifyContent:'space-between'}}>
        {MEDICINE.map((item,i)=>{
          var date=new Date(item?.date).toLocaleDateString()
            return (
              <div className='trying' key={i}>
        <Card className={classes.root} 
        
         onClick={(e)=>TYPE.length===0?handleOpen(e):TYPE==='user'?DETAIL(item._id):null}>
          
          <CardMedia
            className={classes.media}
            image={item?.photo}
            title={item?.name}
          />
          <CardContent>
          <Typography paragraph>
                NAME :{item?.name}
              </Typography>
    
            <Typography paragraph>
                PRICE OF ONE MEDICINE:{item?.price}
              </Typography>
              <Typography paragraph>
                  QUANTITY OF ONE MEDICINE:{item?.quantity}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              LAST UPDATED DATE:{date}
            </Typography>
          </CardContent>
        </Card>
        </div>
            )
        })}
        </div>
        {MEDICINE.length>0 && TYPE.length===0 ?<Models handleClose={handleClose}
        handleOpen={handleOpen} open={open} />:null}
        </>
    )
}
export default Home

// onClick={()=>{history.push(`${PATH.UPDATEMEDICINE}/${item._id}`)}}user for