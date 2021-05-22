import React from "react";
import { Card, CardContent, CardHeader, CardMedia, makeStyles, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        maxWidth: theme.spacing(35),
        alignItems: "center"
    },
    card: {
        width: theme.spacing(40),
        height: theme.spacing(55),
    },
    header: {
        maxHeight: theme.spacing(1),
        fontSize: theme.spacing(1),    
    },
    media: {
        margin: "0 auto 0",
        width: 250,
        height: 350,
    },
    content: {
        textAlign: "center",
        fontSize: theme.spacing(1.5)
    }
}));


const Showitem = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Card className={classes.card}>
                <CardHeader className={classes.header}/>
                <NavLink to={`/show/${props.id}`}>
                    <CardMedia
                        className={classes.media}
                        image={props.image ? props.image.medium : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"}
                        title={props.name}
                    />
                </NavLink>
                <CardContent>
                    <Typography className={classes.content}>
                        <strong> Rating: </strong> {props.rating && props.rating.average ? `${props.rating.average}` : "NA"}
                    </Typography>
                    <Typography className={classes.content}>
                        <strong> Genres: </strong> {props.genres ? `${props.genres}` : "NA"}
                    </Typography>
                </CardContent>

            </Card>

        </div>
    );
};

Showitem.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number,
    image: PropTypes.object,
    medium: PropTypes.string,
    rating: PropTypes.object,
    average: PropTypes.string,
    genres: PropTypes.array,

};

export default Showitem;