import  React, { useContext } from "react";
import Searchbar from "../components/Searchbar";
import showContext from "../reducers/showContext";
import { CircularProgress, makeStyles, Grid } from "@material-ui/core";
import Showitem from "../components/Showitem";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
    load: {
        display: "flex",
        justifyContent: "center",
        height: "50vh",
        alignItems: "center"
    },
    message: {
        margin: 50        
    }
});

const Homepage = () => {
    const classes = useStyles();
    const { shows, loading, alertShow } = useContext(showContext);

    return (
        <div>
            <Searchbar />
            {loading && <div className={classes.load}>
                <CircularProgress />
            </div>}

            <Grid container justify="center">
                {alertShow.display && <Alert className={classes.message} severity="error">
                    {alertShow.message}
                </Alert>}

            <Grid container justify="center" spacing={0}>
                {shows && shows.map((item) =>
                    <Grid item key={item.show.id}>
                        <Showitem {...item.show} key={item.show.id} />
                    </Grid>
                )}
                </Grid>
                

            </Grid>


        </div>
    );
};

export default Homepage;