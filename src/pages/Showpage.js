import { CircularProgress, makeStyles, Grid, Paper, Table, TableRow, TableHead, TableCell, TableContainer, TableBody } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import showContext from "../reducers/showContext";
import Header from "./../components/Header";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#fff",
    },
    load: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    message: {
        margin: theme.spacing(5)
    },
    image: {
        maxWidth: theme.spacing(50),
    },
    table: {
        maxWidth: theme.spacing(50),
    },
    grid: {
        padding: theme.spacing(6)
    }
}));


const Showpage = (match) => {
    const classes = useStyles();
    const { getShowDetails, loading, selectedShow } = useContext(showContext);

    useEffect(() => {
        getShowDetails(match.match.params.id);
        // eslint-disable-next-line
    }, []);

    return (
        <div className={classes.root}>
            <Header />
            <Grid container spacing={2} className={classes.grid}>
                <Grid item xs={12} sm={6} container justify="flex-end" spacing={2}>
                        <img className={classes.image}
                            src={
                                selectedShow.image
                                    ? selectedShow.image.original
                                    : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
                            }
                            alt={selectedShow.name}
                        />
                </Grid>
                <Grid item xs={12} sm={6} container spacing={2}>
                        <Paper elevation={3}>
                            <TableContainer>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left"><h3>Title</h3></TableCell>
                                            <TableCell align="left"><h3>{selectedShow.name}</h3></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="left">Language</TableCell>
                                            <TableCell align="left">{selectedShow.language}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Genres</TableCell>
                                            <TableCell align="left">{selectedShow.genres ? `${selectedShow.genres}` : "NA"}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Premiered</TableCell>
                                            <TableCell align="left">{selectedShow.premiered}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Official Site</TableCell>
                                            <TableCell align="left">{selectedShow.officialSite}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Rating</TableCell>
                                            <TableCell align="left">{selectedShow.rating ? selectedShow.rating.average : "NA"}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Summary</TableCell>
                                            <TableCell align="left"><div dangerouslySetInnerHTML={{ __html: selectedShow.summary }}></div></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                    </Grid>


                
            </Grid>
            <Grid>
                {loading && <div className={classes.load}>
                    <CircularProgress />
                </div>}
            </Grid>


        </div>
    );
};

export default Showpage;