import React from 'react';
import Button from '@material-ui/core/Button';
import PATH from './../../config/webPath';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
export default function SignUpButton({history}) {
  const TOKENS=useSelector(({Token})=>Token)
  return (
      <>
      {TOKENS.length===0?
      <div style={{display:'flex',justifyContent:'space-between' ,flexDirection:'column',margin:'auto',position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width:'70%',height:'15%'}}>
    <Button variant="contained" color="primary" disableElevation onClick={()=>history.push(PATH.USERSIGNUP)}>
      USER
    </Button>
    <Button variant="contained" color="primary" disableElevation onClick={()=>history.push(PATH.SHOPKEPERSIGNUP)}>
        SHOAPKEPER
    </Button>
    </div>:<Redirect to={PATH.HOME}></Redirect>
}
    </>
  );
}