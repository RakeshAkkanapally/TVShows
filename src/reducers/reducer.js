import {
  SET_SHOW,
  CLEAR_SHOW,
  SEARCH_SHOWS,
  IS_LOADING,
  ADD_ALERT,
  REMOVE_ALERT,
  FILTER_SHOWS,
  CLEAR_FILTER_SHOWS,
} from "./actions";

const reducer = (state, action) => {
  let newState;

  switch (action.type) {
    case SEARCH_SHOWS:
      newState = { ...state };
      newState.shows = action.payload ? action.payload : [];
      newState.loading = false;
      newState.alertShow.display = false;
      return newState;
    case IS_LOADING:
      newState = { ...state };
      newState.loading = true;
      newState.alertShow.display = false;
      return newState;
    case SET_SHOW:
      newState = { ...state };
      newState.selectedShow = action.payload;
      newState.loading = false;
      return newState;
    case CLEAR_SHOW:
      newState = { ...state };
      newState.shows = [];
      newState.loading = false;
      return newState;
    case ADD_ALERT:
      newState = { ...state };
      newState.alertShow = action.payload;
      newState.loading = false;
      return newState;
    case REMOVE_ALERT:
      newState = { ...state };
      newState.alertShow.display = false;
      newState.alertShow.message = "";
      return newState;
    case FILTER_SHOWS: {
      newState = { ...state };
      console.log(action.payload);
      let rating = action.payload.showRating;
      let genre = action.payload.showGenre;
      let shows =
        rating === "All"
          ? action.payload.data
          : action.payload.data.filter((show) => {
              return Math.floor(show.rating.average) === parseInt(rating);
            });
      shows =
        genre.length === 0
          ? shows
          : shows.filter((show) => {
              let found = false;
              show.genres &&
                show.genres.forEach((item) => {
                  if (genre.includes(item)) {
                    found = true;
                  }
                });
              return found;
            });
      let filteredShows = shows.sort(
        (a, b) => parseFloat(b.rating.average) - parseFloat(a.rating.average)
      );
      newState.filterShows = filteredShows;
      newState.loading = false;
      return newState;
    }
    case CLEAR_FILTER_SHOWS:
      newState = { ...state };
      newState.filterShows = [];
      return newState;
    default:
      return state;
  }
};

export default reducer;
