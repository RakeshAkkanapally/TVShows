import React from 'react';
import { SET_SHOW, CLEAR_SHOW, SEARCH_SHOWS, IS_LOADING, ADD_ALERT, REMOVE_ALERT, FILTER_SHOWS, CLEAR_FILTER_SHOWS } from './actions'
import { useReducer } from 'react';
import ShowContext from './showContext';
import reducer from './reducer';
import { tvShowService } from '../services/tvShowServices';


const State = (props) => {

    const initialState = {
        shows: [],
        selectedShow: {},
        loading: false,
        alertShow: { display: false, message: "" },
        filterShows: []
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const service = new tvShowService();

    const searchShows = async (searchShow) => {
        clearShow();
       // dispatch({ type: SEARCH_SHOWS, payload: [] });

        if (!searchShow) {
            dispatch({ type: ADD_ALERT, payload: { display: true, message: "Please enter something!" } })
            setTimeout(() => { dispatch({ type: REMOVE_ALERT }) }, 10000);
        } else {
            dispatch({ type: IS_LOADING });


            const response = await service.getSearchShow(searchShow);

            if (response.data.length === 0) {
                dispatch({ type: ADD_ALERT, payload: { display: true, message: "No Results Found!" } })
                setTimeout(() => { dispatch({ type: REMOVE_ALERT }) }, 10000);
            } else {
                dispatch({ type: SEARCH_SHOWS, payload: response.data });
            }
        }

       
    }

    const getShowDetails = async (selectedShow) => {
        clearShow();
        dispatch({ type: IS_LOADING });

        const response = await service.getSingleShow(selectedShow);

        if (response.data.length === 0) {
            dispatch({ type: ADD_ALERT, payload: { display: true, message: "No Page Details Found!" } })
        } else {
            dispatch({ type: SET_SHOW, payload: response.data });
        }
    }

    const getfilterShows = async (showRating, showGenre) => {
        clearFilterShow();
        dispatch({ type: IS_LOADING });

        const response = await service.getAllShows();
        dispatch({ type: FILTER_SHOWS, payload: { data: response.data, showRating, showGenre } });

    }

    const clearShow = () => {
        dispatch({
            type: CLEAR_SHOW
        });
    }

    const clearFilterShow = () => {
        clearShow();
        dispatch({
            type: CLEAR_FILTER_SHOWS
        });
    }

    return (<ShowContext.Provider value={{ shows: state.shows, filterShows: state.filterShows, selectedShow: state.selectedShow, loading: state.loading, alertShow: state.alertShow, searchShows, getShowDetails, getfilterShows }}>{props.children}</ShowContext.Provider>);
}

export default State;