import {
  makeStyles,
  Grid,
  Paper,
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";
import { PropTypes } from "prop-types";
import React, { useContext, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import ShowItem from "../components/ShowItem";
import showContext from "../reducers/showContext";
import Header from "../components/Header";
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
    alignItems: "center",
  },
  message: {
    margin: theme.spacing(5),
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
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    paddingLeft: theme.spacing(0.6),
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
  imagePaper: {
    backgroundColor: "#000",
  },
}));

const Episodepage = ({ match }) => {
  const classes = useStyles();
  const {
    getEpisodeDetails,
    episodesList,
    selectedEpisode,
    selectEpisode,
    errorDisplay,
  } = useContext(showContext);

  useEffect(async () => {
    let showId = match.params.id;
    let snum = match.params.snum;
    let epnum = match.params.epnum;
    await getEpisodeDetails(showId, snum);
    await selectEpisode(snum, epnum);
    // eslint-disable-next-line
  }, [match.params.snum, match.params.epnum]);

  if (errorDisplay) return <NotFoundpage />;
  return (
    <div className={classes.root}>
      <Header />
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} sm={6} container justify="center" spacing={2}>
          <Paper elevation={3} className={classes.imagePaper}>
            <img
              className={classes.image}
              src={getImage(selectedEpisode)}
              alt={selectedEpisode.name}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} container spacing={2}>
          <Paper elevation={3}>
            <Tableitem
              headerRow={{ name: `Title`, value: selectedEpisode.name }}
              rows={[
                { name: `Season`, value: selectedEpisode.season },
                { name: `Episode`, value: selectedEpisode.number },
                { name: `Type`, value: selectedEpisode.type },
                { name: `Air Date`, value: selectedEpisode.airdate },
                {
                  name: `Air Time`,
                  value: selectedEpisode.airtime,
                },
              ]}
              innerHTMLRow={[
                { name: `Summary`, value: selectedEpisode.summary },
              ]}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid>
        <div className={classes.gridListRoot}>
          <GridList className={classes.gridList}>
            <ThemeProvider theme={theme}>
              {episodesList &&
                episodesList.map((item) => (
                  <GridListTile className={classes.gridListTile} key={item.id}>
                    <strong>
                      <GridListTileBar
                        title={`Episode ` + item.number}
                        titlePosition="top"
                        classes={{
                          root: classes.titleBar,
                        }}
                      ></GridListTileBar>
                    </strong>
                    <ShowItem
                      id={match.params.id}
                      snum={item.season}
                      epnum={item.number}
                      name={item.name}
                      url={`episodes`}
                      image={item.image}
                      imageType={`original`}
                      rows={[{ name: `Episode Number`, value: item.number }]}
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

function getImage(selectedEpisode) {
  return selectedEpisode.image
    ? selectedEpisode.image.original
    : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";
}

Episodepage.propTypes = {
  match: PropTypes.object,
};

export default Episodepage;
