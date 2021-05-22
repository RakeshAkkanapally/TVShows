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
import Showitem from "../components/Showitem";
import ratingsData from "../data/ratings.json";
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
  },
  formControl: {
    backgroundColor: "#fff",
    margin: theme.spacing(1),
    minWidth: theme.spacing(20),
    maxWidth: theme.spacing(30),
    borderRadius: theme.spacing(1),
  },
  load: {
    display: "flex",
    justifyContent: "center",
    height: "50vh",
    alignItems: "center",
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

const Dashboardpage = () => {
  const classes = useStyles();
  const {
    filterShows,
    getfilterShows,
    loading,
    alertShow,
    getAllShows,
    selectedRating,
    setSelectedRating,
    selectedGenre,
    setSelectedGenre,
  } = useContext(showContext);
  const [genres, setGenres] = useState([]);
  let initialRender = useRef(true);
 
  useEffect(async () => {
    setGenres(await getGenres());
    await getAllShows();
    // eslint-disable-next-line
  }, []);

  useEffect(async () => {
    initialRender.current
      ? (initialRender.current = false)
      : await getfilterShows(selectedRating, selectedGenre);
      
    // eslint-disable-next-line
  }, [selectedRating, selectedGenre]);

  const handleChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleChangeRating = (event) => {
    setSelectedRating(event.target.value);
  };

  const ratings = ratingsData;

  return (
    <div>
      <Header />

      <Grid container justify="center">
        <Grid item sm container justify="flex-end">
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="select-filled-label">Rating</InputLabel>
            <Select
              labelId="select-filled-label"
              id="simple-select-filled"
              value={selectedRating}
              onChange={handleChangeRating}
              autoWidth
            >
              <MenuItem value="">
                <em>Please select rating</em>
              </MenuItem>
              {ratings.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label==="All"?option.label:"> "+option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm container justify="flex-start">
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
              autoWidth
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
      {loading && (
        <div className={classes.load}>
          <CircularProgress />
        </div>
      )}
      <Grid container justify="center">
        {alertShow.display && (
          <Alert className={classes.message} severity="error">
            {alertShow.message}
          </Alert>
        )}
      </Grid>
      <div className={classes.root}>
        <GridList className={classes.gridList}>
          <ThemeProvider theme={theme}>
            {filterShows &&
              filterShows.map((item) => (
                <GridListTile className={classes.gridListTile} key={item.id}>
                  <GridListTileBar
                    title={item.name}
                    titlePosition="top"
                    classes={{
                      root: classes.titleBar,
                    }}
                  ></GridListTileBar>
                  <Showitem {...item} key={item.id} />
                </GridListTile>
              ))}
          </ThemeProvider>
        </GridList>
      </div>
    </div>
  );
};

export default Dashboardpage;
