import {
  SET_SHOW,
  CLEAR_SHOW,
  SEARCH_SHOWS,
  IS_LOADING,
  ADD_ALERT,
  REMOVE_ALERT,
  FILTER_SHOWS,
  CLEAR_FILTER_SHOWS,
  ALL_SHOWS,
  SET_GENRE,
  SET_RATING,
  SET_SEASON,
  SET_EPISODES,
  SELECT_EPISODE,
  SET_SEARCHKEY,
} from "./actions";
import React, { useReducer } from "react";
import ShowContext from "./showContext";
import reducer from "./reducer";
import { tvShowService } from "../services/tvShowServices";
import PropTypes from "prop-types";

const State = (props) => {
  const initialState = {
    shows: [],
    selectedShow: {},
    searchKey: "",
    enteredShow: "",
    selectedRating: "All",
    selectedGenre: [],
    loading: false,
    alertShow: "",
    alertShowMessage: "",
    filterShows: [],
    seasonsList: [],
    episodesList: [],
    selectedEpisode: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const service = new tvShowService();

  const setSelectedRating = (rating) => {
    dispatch({ type: SET_RATING, payload: rating });
  };

  const setSelectedGenre = (genre) => {
    dispatch({ type: SET_GENRE, payload: genre });
  };

  const setSearchKey = function (searchKey) {
    dispatch({ type: SET_SEARCHKEY, payload: searchKey });
  };

  const searchShows = async (searchShow) => {
    if (searchShow) {
      await clearFilterShow();
      const response = await service.getSearchShow(searchShow);

      if (response.data.length === 0) {
        dispatch({
          type: ADD_ALERT,
          payload: { display: true, message: "No Results Found!" },
        });
      } else {
        dispatch({
          type: SEARCH_SHOWS,
          payload: { data: response.data, searchShow },
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT });
    }, 10000);
    console.log(REMOVE_ALERT);
  };

  const getShowDetails = async (showId) => {
    clearFilterShow();

    const response = await service.getSingleShow(showId);

    if (response.data.length === 0) {
      dispatch({
        type: ADD_ALERT,
        payload: { display: true, message: "No Page Details Found!" },
      });
    } else {
      dispatch({ type: SET_SHOW, payload: response.data });
    }
  };

  const getSeasonDetails = async (showId) => {
    dispatch({ type: IS_LOADING });

    const response = await service.getSeasons(showId);

    if (response.data.length === 0) {
      dispatch({
        type: ADD_ALERT,
        payload: { display: true, message: "No Season Details Found!" },
      });
    } else {
      dispatch({ type: SET_SEASON, payload: response.data });
    }
  };

  const getEpisodeDetails = async (showId, snum) => {
    dispatch({ type: IS_LOADING });

    const response = await service.getEpisode(showId);
    if (response.data.length === 0) {
      dispatch({
        type: ADD_ALERT,
        payload: { display: true, message: "No Season Details Found!" },
      });
    } else {
      dispatch({
        type: SET_EPISODES,
        payload: { data: response.data, snum: snum },
      });
    }
  };

  const selectEpisode = (snum, epnum) => {
    dispatch({ type: SELECT_EPISODE, payload: { snum: snum, epnum: epnum } });
  };

  const getfilterShows = async (showRating, showGenre) => {
    dispatch({ type: IS_LOADING });
    dispatch({ type: FILTER_SHOWS, payload: { showRating, showGenre } });
  };

  const getAllShows = async () => {
    dispatch({ type: IS_LOADING });
    const response = await service.getAllShows();
    dispatch({ type: ALL_SHOWS, payload: { data: response.data } });
  };

  const clearShow = () => {
    dispatch({
      type: CLEAR_SHOW,
    });
  };

  const clearFilterShow = () => {
    setSelectedRating("All");
    setSelectedGenre([]);

    dispatch({
      type: CLEAR_FILTER_SHOWS,
    });
  };
  false && clearShow();

  return (
    <ShowContext.Provider
      value={{
        shows: state.shows,
        filterShows: state.filterShows,
        loading: state.loading,
        alertShow: state.alertShow,
        alertShowMessage: state.alertShowMessage,
        selectedRating: state.selectedRating,
        selectedGenre: state.selectedGenre,
        selectedShow: state.selectedShow,
        seasonsList: state.seasonsList,
        selectedEpisode: state.selectedEpisode,
        episodesList: state.episodesList,
        searchKey: state.searchKey,
        setSearchKey,
        searchShows,
        getShowDetails,
        getfilterShows,
        setSelectedGenre,
        setSelectedRating,
        getAllShows,
        getSeasonDetails,
        getEpisodeDetails,
        selectEpisode,
      }}
    >
      {props.children}
    </ShowContext.Provider>
  );
};

State.propTypes = {
  props: PropTypes.object,
  children: PropTypes.object,
};

export default State;
