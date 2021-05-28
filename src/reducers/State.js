import {
  SET_SHOW,
  SEARCH_SHOWS,
  IS_LOADING,
  ADD_ALERT,
  REMOVE_ALERT,
  FILTER_SHOWS,
  CLEAR_FILTER_SHOWS,
  ALL_SHOWS,
  SET_GENRE,
  SET_SEASON,
  SET_EPISODES,
  SELECT_EPISODE,
  SET_SEARCHKEY,
  ERROR_RESPONSE,
} from "./actions";
import React, { useReducer } from "react";
import ShowContext from "./showContext";
import reducer from "./reducer";
import { tvShowService } from "../services/tvShowServices";
import PropTypes from "prop-types";
import initialState from "./initialState.js";

const State = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const service = new tvShowService();

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
      dispatch({
        type: SEARCH_SHOWS,
        payload: { data: response.data, searchShow },
      });
      if (response.data.length === 0) {
        dispatch({
          type: ADD_ALERT,
          payload: { display: true, message: "No Results Found!" },
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT });
    }, 10000);
  };

  const getShowDetails = async (showId) => {
    clearFilterShow();
    try {
      const response = await service.getSingleShow(showId);
      if (response.status === 200) {
        dispatch({ type: SET_SHOW, payload: response });
      } else {
        dispatch({ type: ERROR_RESPONSE, payload: response });
      }
    } catch (error) {
      dispatch({ type: ERROR_RESPONSE, payload: error });
    }
  };

  const getSeasonDetails = async (showId) => {
    dispatch({ type: IS_LOADING });
    try {
      const response = await service.getSeasons(showId);
      if (response.status === 200) {
        dispatch({ type: SET_SEASON, payload: response.data });
      } else {
        dispatch({ type: ERROR_RESPONSE, payload: response });
      }
    } catch (error) {
      dispatch({ type: ERROR_RESPONSE, payload: error });
    }
  };

  const getEpisodeDetails = async (showId, snum) => {
    dispatch({ type: IS_LOADING });
    try {
      const response = await service.getEpisodes(showId);
      dispatch({
        type: SET_EPISODES,
        payload: { data: response.data, snum: snum },
      });
    } catch (error) {
      dispatch({ type: ERROR_RESPONSE, payload: error });
    }
  };

  const selectEpisode = (snum, epnum) => {
    dispatch({ type: SELECT_EPISODE, payload: { snum: snum, epnum: epnum } });
  };

  const getfilterShows = async ( showGenre) => {
    dispatch({ type: IS_LOADING });
    dispatch({ type: FILTER_SHOWS, payload: { showGenre } });
  };

  const getAllShows = async () => {
    dispatch({ type: IS_LOADING });
    clearFilterShow();
    const response = await service.getAllShows();
    dispatch({ type: ALL_SHOWS, payload: { data: response.data } });
  };

  const clearFilterShow = () => {
    setSelectedGenre([]);
    dispatch({
      type: CLEAR_FILTER_SHOWS,
    });
  };

  return (
    <ShowContext.Provider
      value={{
        shows: state.shows,
        filterShows: state.filterShows,
        loading: state.loading,
        alertShow: state.alertShow,
        alertShowMessage: state.alertShowMessage,
        selectedGenre: state.selectedGenre,
        selectedShow: state.selectedShow,
        seasonsList: state.seasonsList,
        selectedEpisode: state.selectedEpisode,
        episodesList: state.episodesList,
        searchKey: state.searchKey,
        errorDisplay: state.errorDisplay,
        errorMessage: state.errorMessage,
        dashboardTitle: state.dashboardTitle,
        setSearchKey,
        searchShows,
        getShowDetails,
        getfilterShows,
        setSelectedGenre,
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
