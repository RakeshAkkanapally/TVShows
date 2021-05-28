import {
  CircularProgress,
  makeStyles,
  Grid,
  Paper,
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import ShowItem from "../components/ShowItem";
import showContext from "../reducers/showContext";
import Header from "./../components/Header";
import Tableitem from "../components/TableItem";
import NotFoundpage from "./NotFoundpage";
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#000",
  },
  load: {
    display: "flex",
    justifyContent: "center",
    height: "50vh",
    alignItems: "center",
  },
  message: {
    margin: theme.spacing(9),
  },
  image: {
    maxWidth: theme.spacing(60),
    maxHeight: theme.spacing(60),
  },
  table: {
    maxWidth: theme.spacing(50),
  },
  grid: {
    padding: theme.spacing(6),
    objectFit: "cover",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    paddingLeft: theme.spacing(0.4),
  },
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  "@global": {
    ".MuiGridListTile-root": {
      width: theme.spacing(35),
    },
  },
}));



const Showpage = (match) => {
  const classes = useStyles();
  const {
    getShowDetails,
    getSeasonDetails,
    loading,
    selectedShow,
    seasonsList,
    errorDisplay,
  } = useContext(showContext);

  useEffect(async () => {
    await getShowDetails(match.match.params.id);
    await getSeasonDetails(match.match.params.id);

    // eslint-disable-next-line
  }, []);

  if (errorDisplay) return <NotFoundpage />;
  return (
    <div className={classes.root}>
      <Header />
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} sm={6} container justify="center" spacing={2}>
          <img
            className={classes.image}
            src={getImage(selectedShow)}
            alt={selectedShow.name}
          />
        </Grid>

        <Grid item xs={12} sm={6} container spacing={2}>
          <Paper elevation={3}>
            <Tableitem
              headerRow={{ name: `Title`, value: selectedShow.name }}
              rows={[
                { name: `Language`, value: selectedShow.language },
                {
                  name: `Genres`,
                  value: selectedShow.genres ? `${selectedShow.genres}` : `NA`,
                },
                { name: `Premiered`, value: selectedShow.premiered },
                { name: `Website`, value: selectedShow.officialSite },
                {
                  name: `Rating`,
                  value: selectedShow.rating
                    ? selectedShow.rating.average
                      ? `${selectedShow.rating.average}*`
                      : `NA`
                    : `NA`,
                },
              ]}
              innerHTMLRow={[{ name: `Summary`, value: selectedShow.summary }]}
            />
          </Paper>
        </Grid>
        <Grid></Grid>
        {loading && (
          <div className={classes.load}>
            <CircularProgress />
          </div>
        )}
      </Grid>
      <Grid>
        <div className={classes.gridListRoot}>
          <GridList className={classes.gridList}>
            <ThemeProvider theme={theme}>
              {seasonsList &&
                seasonsList.map((item) => (
                  <GridListTile className={classes.gridListTile} key={item.id}>
                    <strong>
                      <GridListTileBar
                        title={`Season` + item.number}
                        titlePosition="top"
                        classes={{
                          root: classes.titleBar,
                        }}
                      ></GridListTileBar>
                    </strong>
                    <ShowItem
                      id={match.match.params.id}
                      snum={item.number}
                      epnum={1}
                      url={"episodes"}
                      image={item.image}
                      imageType={`medium`}
                      rows={[{ name: `Episodes`, value: item.episodeOrder }]}
                      key={item.id}
                    />
                  </GridListTile>
                ))}
            </ThemeProvider>
          </GridList>
        </div>
      </Grid>
    </div>
  );
};
function getImage(selectedShow) {
  return selectedShow.image
    ? selectedShow.image.original
    : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";
}

export default Showpage;
