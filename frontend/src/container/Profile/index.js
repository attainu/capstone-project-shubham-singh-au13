import React, { useEffect, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { useSelector, useDispatch } from "react-redux";
import userProfile from "./../../redux/action/User/profile";
import shoapkeperProfile from "./../../redux/action/Shopkeper/profile";
import { Redirect } from "react-router";
import PATH from "./../../config/webPath";
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  center:{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  centerXaxis:{
    position: 'fixed',
    left: '30%',
  }
}));

export default function PROFILE({ history, loaction }) {
  const classes = useStyles();
  const TOKEN = useSelector(({ Token }) => Token);
  const PROFILE = useSelector(({ Profile }) => Profile);
  const TYPE = useSelector(({ Type }) => Type);
  const dispatch = useDispatch();
  const url = useMemo(() => {
    return TYPE === "user"
    
      ? PROFILE?.currentUser?.profilePic
      : PROFILE?.Shoapkeper?.profilePic;
  }, [PROFILE, TYPE]);
  useEffect(() => {
    if (TYPE === "shopkeper") {
      dispatch(shoapkeperProfile.PROFILE);
    } else {
      dispatch(userProfile.PROFILE);
    }
  }, [loaction, dispatch, TYPE]);
  return (
    <>
    <div className={classes.center}>
      {TOKEN.length > 0 && TYPE.length > 0 ? (
        <Card className={classes.root} style={{background:'#3edbf0'}}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {TYPE === "user"
                  ? 'U'
                  : 'S'}
              </Avatar>
            }
            title={
              TYPE === "user"
                ? PROFILE?.currentUser?.name
                : PROFILE?.Shoapkeper?.name
            }
          />
          {url ? (
            <CardMedia className={classes.media} image={url} />
          ) : (
            <h1 style={{ textAlign: "center" }}>PIC IS NOT UPLOADED{url}</h1>
          )}

          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Address:{TYPE === "user"
                ? PROFILE?.currentUser?.Address
                : PROFILE?.Shoapkeper?.Address}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              EMAIL:{TYPE === "user"
                ? PROFILE?.currentUser?.email
                : PROFILE?.Shoapkeper?.email}
            </Typography>
            {TYPE === "user" ? "" : <Typography variant="body2" color="textSecondary" component="p">
              SHOAPNAME:{PROFILE?.Shoapkeper?.shopName}
            </Typography>}
          </CardContent>
          <div className={classes.centerXaxis}>
            <Link style={{textDecoration:'none'}}
             to={TYPE === "user"?PATH.USERUPDATEPROFILE:PATH.SHOPKEPERUPDATEPROFILE}
             >UPDATE PROFILE
             </Link>
              </div>
        </Card>
      ) : (
        <Redirect to={PATH.HOME}></Redirect>
      )}
      </div>
    </>
  );
}
