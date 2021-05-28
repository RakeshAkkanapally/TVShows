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
  SET_SEASON,
  SELECT_EPISODE,
  SET_EPISODES,
  SET_SEARCHKEY,
  ERROR_RESPONSE,
} from "./actions";

const reducer = (state, action) => {
  let newState;

  switch (action.type) {
    case SEARCH_SHOWS: {
      newState = { ...state };
      newState.enteredShow = action.payload.searchShow;
      newState.filterShows = [];
      newState.alertShow = false;
      let shows = action.payload.data ? action.payload.data : [];
      shows = shows.map((item) => {
        return item.show;
      });
      newState.filterShows = shows.sort(
        (a, b) => b.rating.average - a.rating.average
      );
      newState.loading = false;
      newState.dashboardTitle = `Showing Results for '${newState.enteredShow}'`;
      return newState;
    }
    case IS_LOADING:
      newState = { ...state };
      newState.loading = true;
      newState.alertShow = false;
      return newState;
    case SET_SHOW:
      newState = { ...state };
      newState.selectedShow = action.payload.data;
      newState.loading = false;
      return newState;
    case SET_SEASON:
      newState = { ...state };
      newState.seasonsList = action.payload;
      newState.loading = false;
      return newState;
    case CLEAR_SHOW:
      newState = { ...state };
      newState.loading = true;
      newState.errorDisplay = false;
      newState.selectedShow = [];
      return newState;
    case ADD_ALERT:
      newState = { ...state };
      newState.filterShows = [];
      newState.shows = [];
      newState.alertShow = action.payload.display;
      newState.alertShowMessage = action.payload.message;
      newState.loading = false;
      return newState;
    case REMOVE_ALERT:
      newState = { ...state };
      newState.alertShow = false;
      newState.alertShowMessage = "";
      return newState;
    case ALL_SHOWS: {
      newState = { ...state };
      let shows = action.payload.data ? action.payload.data : [];
      let filteredShows = shows.sort(
        (a, b) => b.rating.average - a.rating.average
      );
      newState.filterShows = filteredShows;
      newState.shows = filteredShows;
      newState.loading = false;
      return newState;
    }
    case FILTER_SHOWS: {
      newState = { ...state };
      newState.selectedGenre = action.payload.showGenre;
      let shows = newState.shows;
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
      newState.selectedGenre.length!==0?
       newState.dashboardTitle = `Filter Results for Generes: ${newState.selectedGenre}` :
       newState.dashboardTitle = `All Shows`;
      return newState;
    }
    case CLEAR_FILTER_SHOWS:
      newState = { ...state };
      newState.filterShows = [];
      newState.errorDisplay = false;
      newState.loading = true;
      newState.dashboardTitle = `All Shows`;
      return newState;
    case SET_SEARCHKEY:
      newState = { ...state };
      newState.searchKey = action.payload;
      return newState;
    case SET_GENRE:
      newState = { ...state };
      newState.selectedGenre = action.payload;
      return newState;
    case SET_EPISODES:
      newState = { ...state };
      newState.episodesList = action.payload.data;
      newState.episodesList = newState.episodesList.filter((item) => {
        /* istanbul ignore else */
        if (item.season === parseInt(action.payload.snum)) {
          return true;
        }
      });
      newState.loading = false;
      return newState;
    case SELECT_EPISODE:
      newState = { ...state };
      newState.selectedEpisode = newState.episodesList.find((episode) => {
        /* istanbul ignore else */
        if (
          !isNaN(action.payload.epnum) &&
          !isNaN(action.payload.snum) &&
          episode.number === parseInt(action.payload.epnum) &&
          episode.season === parseInt(action.payload.snum)
        ) {
          return true;
        }
      });
      if (newState.selectedEpisode === undefined) {
        newState.errorDisplay = true;
        newState.errorMessage = `Requested season or episode number not found`;
      }
      newState.loading = false;
      return newState;
    case ERROR_RESPONSE: {
      newState = { ...state };
      let response = action.payload.response;
      newState.errorDisplay = true;
      if (response && response.status === 404)
        newState.errorMessage = response.statusText;
      else newState.errorMessage = `Something Went Wrong!`;
      return newState;
    }

    default:
      return state;
  }
};

export default reducer;
