// buttons for add and update medicine
import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import UpdateIcon from '@material-ui/icons/Update';
import { useHistory } from 'react-router';
import PATH from './../../config/webPath';
import AddBoxIcon from '@material-ui/icons/AddBox';
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


export default function IconLabelButtons() {
  const classes = useStyles();
  const history=useHistory()
  const AddMedicine=()=>{
      history.push(PATH.ADDMEDICINE)
}
const UPDATEMEDICINE=()=>{
  history.push(PATH.ALLMEDICINEOFSINGLEADMIN)
}
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<AddBoxIcon />}
        onClick={AddMedicine}
      >
        Add Medicine
      </Button>
      {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<UpdateIcon/>}
        onClick={UPDATEMEDICINE}
      >
        UpdateMedicine
      </Button>
    </div>
  );
}
