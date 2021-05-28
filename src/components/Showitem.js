import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    maxWidth: theme.spacing(30),
    alignItems: "center",
  },
  card: {
    width: theme.spacing(30),
    height: theme.spacing(45),
  },
  header: {
    maxHeight: theme.spacing(1),
    fontSize: theme.spacing(1),
  },
  media: {
    margin: "0 auto 0",
    width: theme.spacing(33),
    height: theme.spacing(45),
  },
  content: {
    margin: "0 auto 0",
    textAlign: "center",
    fontSize: theme.spacing(1.5),
  },
}));

const ShowItem = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        {props.url ? (
          <NavLink
            to={
              props.url === "show"
                ? `/show/${props.id}`
                : `/show/${props.id}/episodes/${props.snum}/${props.epnum}`
            }
          >
            <CardMedia
              className={classes.media}
              image={getImage(props.image, props.imageType)}
            ></CardMedia>
          </NavLink>
        ) : (
          <CardMedia
            className={classes.media}
            image={getImage(props.image, props.imageType)}
          ></CardMedia>
        )}
        <CardContent>
          {props.rows &&
            props.rows.map((row) => (
              <Typography className={classes.content} key={row.name}>
                <strong>{row.name + ":"} </strong>
                {row.value ? `${row.value}` : "NA"}
              </Typography>
            ))}
        </CardContent>
      </Card>
    </div>
  );
};

function getImage(image, type) {
  return image
    ? image[type]
    : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";
  
  }

ShowItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  num: PropTypes.number,
  image: PropTypes.object,
  imageType: PropTypes.string,
  medium: PropTypes.string,
  rating: PropTypes.object,
  average: PropTypes.string,
  genres: PropTypes.array,
  episodeOrder: PropTypes.number,
  url: PropTypes.string,
  rows: PropTypes.array,
  snum: PropTypes.number,
  epnum: PropTypes.number,
};

export default ShowItem;
