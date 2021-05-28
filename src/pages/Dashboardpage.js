import {
  Checkbox,
  CircularProgress,
  createMuiTheme,
  FormControl,
  GridList,
  GridListTile,
  GridListTileBar,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState, useContext, useRef } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import showContext from "../reducers/showContext";
import ShowItem from "../components/ShowItem";
import Header from "../components/Header";
import { ThemeProvider } from "styled-components";
import { getGenres } from "../reducers/util";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    padding: `${theme.spacing(1)}px ${theme.spacing(10)}px ${theme.spacing(
      5
    )}px`,
  },
  formControl: {
    backgroundColor: "#ddd",
    margin: theme.spacing(1),
    minWidth: theme.spacing(15),
    maxWidth: theme.spacing(25),
    minHeight: theme.spacing(6),
    maxHeight: theme.spacing(6),
    borderRadius: theme.spacing(1),
  },
  load: {
    display: "flex",
    justifyContent: "center",
    height: "50vh",
    alignItems: "center",
  },
  dropdown: {
    paddingRight: theme.spacing(10),
    height: theme.spacing(5)
  },
  message: {
    margin: theme.spacing(9),
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBarName: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    textAlign: "center",
  },
  titleBarRating: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    textAlign: "right",
    paddingRight: theme.spacing(1.5),
  },
  showTitle: {
    padding: theme.spacing(10),
  },
  gridTitle: {
    margin: 0,
    color:"orange",
    padding: `0 ${theme.spacing(12)}px`,
    maxWidth: "60%"
  },
  gridTitleHeader: {
    marginBottom: theme.spacing(0.5),
    fontSize: "medium"
  },
  "@global": {
    ".MuiGridListTile-root": {
      width: theme.spacing(35),
    },
    ".MuiInput-root": {
      padding: "0 0 0 10px",
    },
  },
}));

const theme = createMuiTheme();

const Dashboardpage = (match) => {
  const classes = useStyles();
  const {
    filterShows,
    getfilterShows,
    loading,
    alertShow,
    alertShowMessage,
    getAllShows,
    selectedGenre,
    setSelectedGenre,
    searchShows,
    setSearchKey,
    dashboardTitle,
  } = useContext(showContext);
  const [genres, setGenres] = useState([]);
  let initialRender = useRef(true);

  useEffect(async () => {
    setGenres(await getGenres());
    // eslint-disable-next-line
  }, []);

  useEffect(async () => {
    let searchValue = match.location.search.split("=")[1];
    setSearchKey("");
    if (match.location.search && typeof searchValue !== undefined) {
      searchShows(searchValue);
    } else {
      await getAllShows();
      setSelectedGenre([]);
    }
    setSelectedGenre([]);
  }, [match]);

  useEffect(async () => {
    initialRender.current || typeof searchValue === undefined
      ? (initialRender.current = false)
      : await getfilterShows(selectedGenre);

    // eslint-disable-next-line
  }, [selectedGenre]);

  const handleChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div>
      <Header />
      <Grid container justify="center">
        <Grid item sm container justify="flex-end" className={classes.dropdown}>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="mutiple-checkbox-label" className={classes.label}>
              Genres
            </InputLabel>
            <Select
              disableUnderline={true}
              labelId="mutiple-checkbox-label"
              id="mutiple-checkbox"
              multiple
              value={selectedGenre}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              autoWidth={true}
              data-testid="select-genre"
            >
              <MenuItem value="">
                <em></em>
              </MenuItem>
              {genres.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedGenre.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div className={classes.gridTitle}>
        <div className={classes.gridTitleHeader}>{dashboardTitle}</div>
        <hr/>
      </div>
      <Grid container justify="center">
        {alertShow && (
          <Alert className={classes.message} severity="error">
            {alertShowMessage}
          </Alert>
        )}
        {loading && (
          <div className={classes.load}>
            <CircularProgress />
          </div>
        )}
      </Grid>

      <div className={classes.root}>
        <GridList className={classes.gridList}>
          <ThemeProvider theme={theme}>
            {filterShows &&
              filterShows.map((item) => (
                <GridListTile className={classes.gridListTile} key={item.id}>
                  <strong>
                    <GridListTileBar
                      title={item.name}
                      titlePosition="bottom"
                      classes={{
                        root: classes.titleBarName,
                      }}
                    ></GridListTileBar>
                    <GridListTileBar
                      title={item.rating.average ? item.rating.average : "NA"}
                      titlePosition="top"
                      classes={{
                        root: classes.titleBarRating,
                      }}
                    ></GridListTileBar>
                  </strong>

                  <ShowItem
                    id={item.id}
                    name={item.name}
                    url={`show`}
                    image={item.image}
                    imageType={`original`}
                    rating={item.rating}
                    genres={item.genres}
                    rows={[
                      {
                        name: `Rating`,
                        value: item.rating.average ? item.rating.average : `NA`,
                      },
                      { name: `Genre`, value: item.genres },
                    ]}
                    key={item.id}
                  />
                </GridListTile>
              ))}
          </ThemeProvider>
        </GridList>
      </div>
    </div>
  );
};

export default Dashboardpage;
