import {
  CircularProgress,
  makeStyles,
  Grid,
  Paper,
  createMuiTheme,
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import Showitem from "../components/Showitem";
import showContext from "../reducers/showContext";
import Header from "../components/Header";
import Tableitem from "../components/Tableitem";

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
    maxWidth: theme.spacing(50),
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
  },
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  "@global": {
    ".MuiGridListTile-root": {
      width: theme.spacing(50),
    },
  },
}));

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontSize: "2rem",
      },
    },
  },
});

const Episodepage = (match) => {
  const classes = useStyles();
  const {
    getEpisodeDetails,
    loading,
    episodesList,
    selectedEpisode,
    selectEpisode,
  } = useContext(showContext);


  useEffect(async()=>{
    await getEpisodeDetails(match.match.params.id, match.match.params.snum);
    await selectEpisode(match.match.params.snum, "1");
  },[]);

  useEffect(async () => {
    await getEpisodeDetails(match.match.params.id, match.match.params.snum);
    await selectEpisode(match.match.params.snum, match.match.params.epnum);
    // eslint-disable-next-line
  }, [selectedEpisode]);



  return (
    <div className={classes.root}>
      <Header />
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12} sm={6} container justify="center" spacing={2}>
          <img
            className={classes.image}
            src={
              selectedEpisode.image
                ? selectedEpisode.image.original
                : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
            }
            alt={selectedEpisode.name}
          />
        </Grid>

        <Grid item xs={12} sm={6} container spacing={2}>
          <Paper elevation={3}>
            <Tableitem
              {...selectedEpisode}
              headerRow={{ name: "Title", value: selectedEpisode.name }}
              rows={[
                { name: "Season", value: selectedEpisode.season },
                { name: "Episode", value: selectedEpisode.number },
                { name: "Type", value: selectedEpisode.type },
                { name: "Air Date", value: selectedEpisode.airdate },
                {
                  name: "Air Time",
                  value: selectedEpisode.airtime,
                },
              ]}
              innerHTMLRow={[
                { name: "Summary", value: selectedEpisode.summary },
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
                    <GridListTileBar
                      title={item.name}
                      titlePosition="top"
                      classes={{
                        root: classes.titleBar,
                      }}
                    ></GridListTileBar>
                    <Showitem
                      id={match.match.params.id}
                      snum={item.season}
                      epnum={item.number}
                      name={item.name}
                      url={"episodes"}
                      image={item.image}
                      rows={[{ name: "Episode Number", value: item.number }]}
                      key={item.id}
                    />
                  </GridListTile>
                ))}
            </ThemeProvider>
          </GridList>
        </div>
        <Grid>
          {!loading && (
            <div className={classes.load}>
              <CircularProgress />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Episodepage;
