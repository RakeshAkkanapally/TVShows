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
    enteredShow: "",
    selectedRating: "All",
    selectedGenre: [],
    loading: false,
    alertShow: { display: false, message: "" },
    filterShows: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const service = new tvShowService();

  const setSelectedRating = (rating) => {
    dispatch({ type: SET_RATING, payload: rating });
  };

  const setSelectedGenre = (genre) => {
    dispatch({ type: SET_GENRE, payload: genre });
  };

  const searchShows = async (searchShow) => {
    clearFilterShow();
    dispatch({ type: IS_LOADING });

    if (!searchShow) {
      dispatch({
        type: ADD_ALERT,
        payload: { display: true, message: "Please enter something!" },
      });
      setTimeout(() => {
        dispatch({ type: REMOVE_ALERT });
      }, 10000);
    } else {
      const response = await service.getSearchShow(searchShow);

      if (response.data.length === 0) {
        dispatch({
          type: ADD_ALERT,
          payload: { display: true, message: "No Results Found!" },
        });
        setTimeout(() => {
          dispatch({ type: REMOVE_ALERT });
        }, 10000);
      } else {
        dispatch({
          type: SEARCH_SHOWS,
          payload: { data: response.data, searchShow },
        });
      }
    }
  };

  const getShowDetails = async (showId) => {
    
    dispatch({ type: IS_LOADING });

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
    
    dispatch({
      type: CLEAR_FILTER_SHOWS,
    });
  };
 false && clearShow();
 false && clearFilterShow();

  return (
    <ShowContext.Provider
      value={{
        shows: state.shows,
        filterShows: state.filterShows,
        loading: state.loading,
        alertShow: state.alertShow,
        selectedRating: state.selectedRating,
        selectedGenre: state.selectedGenre,
        selectedShow: state.selectedShow,
        searchShows,
        getShowDetails,
        getfilterShows,
        setSelectedGenre,
        setSelectedRating,
        getAllShows,
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
