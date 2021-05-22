import { makeStyles, InputBase, IconButton, Grid } from "@material-ui/core";
import { useContext, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShowContext from "../reducers/showContext";
import React from "react";

const useStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: "#ddd",
    minWidth: theme.spacing(15),
    marginLeft: theme.spacing(2),
    padding: `0px ${theme.spacing(2)}px`,
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2),
    fontSize: "small",
  },
  message: {
    width: "40%",
  },
}));

function Searchbar() {
  const classes = useStyles();
  const [searchKey, setSearchKey] = useState("");
  const { searchShows, setSelectedRating, setSelectedGenre, getAllShows } =
    useContext(ShowContext);

  const updateSearch = async function (e) {
    setSearchKey(e.target.value);
    e.target.value.length === 0 && getAllShows();
  };
  
  const onSearchHandler = function (e) {
    e.preventDefault();
    searchShows(searchKey);
    setSelectedRating("All");
    setSelectedGenre([]);
  };

  return (
    <Grid
      container
      spacing={0}
      align="center"
      justify="center"
      direction="column"
    >
      <Grid item xs={12}>
        <InputBase
          className={classes.input}
          placeholder="Search TV Shows.."
          value={searchKey}
          endAdornment={
            <IconButton data-testid="searchIcon" onClick={onSearchHandler}>
              <SearchIcon fontSize="small" />
            </IconButton>
          }
          onChange={updateSearch}
          inputProps={{ "data-testid": "search" }}
        />
      </Grid>
    </Grid>
  );
}

export default Searchbar;
