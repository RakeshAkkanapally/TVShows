import { makeStyles, InputBase, IconButton, Grid } from "@material-ui/core";
import { useContext } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShowContext from "../reducers/showContext";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: "#ddd",
    minWidth: theme.spacing(15),
    marginLeft: theme.spacing(2),
    padding: `0px ${theme.spacing(2)}px`,
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2),
    fontSize: "medium",
    }
}));

function SearchBar() {
  const classes = useStyles();
  const {
    searchKey,
    setSearchKey,
    getAllShows,
    setSelectedGenre,
  } = useContext(ShowContext);
  const history = useHistory();

  const updateSearch = function (e) {
    setSearchKey(e.target.value);
    if (e.target.value.length === 0) {
      getAllShows();
      setSelectedGenre([]);
    }
  };

  const onSearchHandler = function (e) {
    e.preventDefault();
    history.push("/search?q=" + searchKey);
  };

  return (

      <Grid >
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

  );
}

export default SearchBar;
