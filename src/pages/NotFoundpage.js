import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
    margin: 0,
    padding: 50,
  },
  text: {
    margin: 6,
    paddingLeft: 80,
  },
  image: {
    height: 500,
  },
});

const NotFoundpage = () => {
  const classes = useStyles();

  return (
    <div id="wrapper" className={classes.root}>
      <div id="info" className={classes.text}>
        <h3>
          This page could not be found
          <NavLink exact to="/" activeClassName={classes.activeLink}>
            <Typography className={classes.hover}>Dashbaord</Typography>
          </NavLink>
        </h3>
      </div>
      <img className={classes.image} src="https://i.imgur.com/qIufhof.png" />
    </div>
  );
};

export default NotFoundpage;
