import { AppBar, Grid, makeStyles, Toolbar, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import MovieIcon from "@material-ui/icons/Movie";
import { NavLink } from "react-router-dom";
import React from "react";
import Searchbar from "./Searchbar";

const useStyles = makeStyles((theme)=>({
    root: {
        backgroundColor: "#000",
        color: "#000",
    },
    paper: {
        backgroundColor: "inherit",
        textAlign: "center",
        color: "#fff",
        width:theme.spacing(80),
        fontSize: theme.spacing(1)
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
        }
    }

}));




function Header() {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static"
                className={classes.root}>
                <Grid container
                    direction="row"
                    alignItems="center">
                    <Grid item xs={6} >
                        <NavLink exact to="/" className={classes.logo}>
                                <Toolbar>
                                    <MovieIcon fontSize="large" />
                                    <Typography variant="h6">
                                        <strong>TV SHOWS</strong>
                                    </Typography>
                                </Toolbar>
                        </NavLink>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                        <Searchbar />
                        </Paper> 
                         
                    </Grid>
                </Grid>
            </AppBar>
        </div>);
}

export default Header;