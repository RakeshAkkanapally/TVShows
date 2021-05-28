import {
  AppBar,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import { NavLink } from "react-router-dom";
import React from "react";
import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#000",
    color: "#000",
  },
  paper: {
    backgroundColor: "inherit",
    textAlign: "center",
    color: "#fff",
    width: theme.spacing(80),
    fontSize: theme.spacing(1),
  },
  activeLink: {
    fontWeight: "bold",
    color: "blue",
  },
  logo: {
    textDecoration: "none",
    backgroundColor: "inherit",
    textAlign: "center",
    color: "#fff",
  },
  hover: {
    "&:hover": {
      color: "#f00",
    },
  },
  icon: {
    color:"orange",
  }
}));

function Header() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Grid item xs={6}>
            <NavLink exact to="/" className={classes.logo}>
              <Toolbar className={classes.icon}>
                <MovieFilterIcon fontSize="large" />
                <Typography variant="h6">
                  <strong>TV SHOWS</strong>
                </Typography>
              </Toolbar>
            </NavLink>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <SearchBar />
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
}

export default Header;
