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
  SET_RATING,
  SET_GENRE,
  
} from "./actions";

const reducer = (state, action) => {
  let newState;

  switch (action.type) {
    case SEARCH_SHOWS:{
      newState = { ...state };
      newState.enteredShow = action.payload.searchShow;
      newState.filterShows=[];
      let shows = action.payload.data ? action.payload.data : [];
      newState.shows=shows.map((item)=>{return item.show;});
      newState.filterShows=newState.shows;
      newState.loading = false;
      return newState;
    }
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
      newState.selectedShow = [];
      newState.loading = false;
      return newState;
    case ADD_ALERT:
      newState = { ...state };
      newState.filterShows=[];
      newState.shows=[];
      newState.alertShow = action.payload;
      newState.loading = false;
      return newState;
    case REMOVE_ALERT:
      newState = { ...state };
      newState.alertShow.display = false;
      newState.alertShow.message = "";
      return newState;
    case ALL_SHOWS:{
      newState={...state};
      let shows = action.payload.data ? action.payload.data : [];
      let filteredShows = shows.sort(
        (a, b) => parseFloat(b.rating.average) - parseFloat(a.rating.average)
      );
      newState.filterShows = filteredShows;
      newState.shows = filteredShows;
      newState.loading = false;
      return newState;
    }
    case FILTER_SHOWS: {
      newState = { ...state };
      newState.selectedRating=action.payload.showRating;
      newState.selectedGenre=action.payload.showGenre;
      let prevShows = newState.shows;
      let shows =
      newState.selectedRating === "All"
          ? prevShows
          : prevShows.filter((show) => {
              return Math.floor(show.rating.average) >= parseInt(newState.selectedRating);
            });
      shows =
      newState.selectedGenre.length === 0
          ? shows
          : shows.filter((show) => {
              let found = false;
              show.genres &&
                show.genres.forEach((item) => {
                  if (newState.selectedGenre.includes(item)) {
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
     case SET_RATING:
        newState = { ...state };
        newState.selectedRating = action.payload;
        console.log(action);
        return newState;
      case SET_GENRE:
        newState = { ...state };
        newState.selectedGenre = action.payload;
        console.log(action);
        return newState;
    default:
      return state;
  }
};

export default reducer;
