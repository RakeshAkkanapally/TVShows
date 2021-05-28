import React, { useContext } from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import showContext from "./../reducers/showContext";
import PropTypes from "prop-types";
import Header from "./../components/Header";

const theme = createMuiTheme();

const useStyles = makeStyles({
  root: {
    backgroundColor: "#ddd",
    margin: 0,
    padding: 0,
    height: "100vh",
  },
  text: {
    margin: 0,
    padding: theme.spacing(5),
    color: "red",
  },
  textContent: {
    margin: 0,
    paddingLeft: theme.spacing(5),
  },
  image: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: theme.spacing(40),
    height: theme.spacing(50),
  },
});

const NotFoundpage = ({
  data = "This page isn't available. Sorry about that.",
}) => {
  const classes = useStyles();
  const { errorMessage } = useContext(showContext);

  return (
    <div>
      <Header />
      <div id="wrapper" className={classes.root}>
        <div id="info">
          <h3 className={classes.text}>
            Error!
            <hr />
          </h3>
          <div className={classes.textContent}>
            <div>{errorMessage ? errorMessage : data}</div>
            <br />
            Go to{" "}
            <NavLink exact to="/" activeClassName={classes.activeLink}>
              Dashboard Page
            </NavLink>
          </div>
        </div>
        <img className={classes.image} src="https://i.imgur.com/qIufhof.png" />
      </div>
    </div>
  );
};

NotFoundpage.propTypes = {
  data: PropTypes.string,
};

export default NotFoundpage;
