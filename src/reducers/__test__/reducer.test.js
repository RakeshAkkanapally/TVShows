import reducer from "./../reducer";
import {
  SELECT_EPISODE,
  ADD_ALERT,
  ALL_SHOWS,
  CLEAR_FILTER_SHOWS,
  CLEAR_SHOW,
  FILTER_SHOWS,
  IS_LOADING,
  REMOVE_ALERT,
  SEARCH_SHOWS,
  SET_EPISODES,
  SET_GENRE,
  SET_SEARCHKEY,
  SET_SEASON,
  SET_SHOW,
  ERROR_RESPONSE,
} from "./../actions";
import initialState from "./../initialState.js";

describe("verify reducer page", () => {
  let state;

  beforeEach(() => {
    state = initialState;
  });

  afterEach(() => {
    state = "";
  });

  it("verify reducers with value - SEARCH_SHOWS", () => {
    let data = [
      {
        show: {
          id: 49334,
          name: "Shining Girls",
          genres: ["Drama", "Science-Fiction", "Thriller"],
          rating: { average: 9 },
        },
      },
      {
        show: {
          id: 169,
          name: "Girls",
          genres: ["Drama", "Science-Fiction", "Thriller"],
          rating: { average: 7 },
        },
      }
    ];
    const result = reducer(state, {
      type: SEARCH_SHOWS,
      payload: { data: data, searchShow: "girls" },
    });
    expect(result.filterShows[0].name).toBe(data[0].show.name);
  });

  it("verify reducers with empty value - SEARCH_SHOWS", () => {
    const result = reducer(state, {
      type: SEARCH_SHOWS,
      payload: { searchShow: "" },
    });
    expect(result.filterShows.length).toBe(0);
  });

  it("verify reducers with value - IS_LOADING", () => {
    const result = reducer(state, {
      type: IS_LOADING,
    });
    expect(result.loading).toBe(true);
  });

  it("verify reducers with value - SET_SHOW", () => {
    let data = {
      id: 169,
      name: "Breaking Bad",
    };
    const result = reducer(state, {
      type: SET_SHOW,
      payload: {data},
    });
    expect(result.selectedShow).toBe(data);
  });


  it("verify reducers with value - SET_SEASON", () => {
    let data = [
      {
        id: 753,
        number: 1,
        episodeOrder: 7,
      },
    ];
    const result = reducer(state, {
      type: SET_SEASON,
      payload: data,
    });
    expect(result.seasonsList).toBe(data);
  });


  it("verify reducers with value - CLEAR_SHOW", () => {
    const result = reducer(state, {
      type: CLEAR_SHOW,
    });
    expect(result.selectedShow).toHaveLength(0);
  });

  it("verify reducers with value - ADD_ALERT", () => {
    let message = "No Season Details Found!";
    const result = reducer(state, {
      type: ADD_ALERT,
      payload: { display: true, message: message },
    });
    expect(result.alertShow).toBe(true);
    expect(result.alertShowMessage).toBe(message);
  });

  it("verify reducers with value - CLEAR_SHOW", () => {
    const result = reducer(state, {
      type: REMOVE_ALERT,
    });
    expect(result.alertShow).toBe(false);
    expect(result.alertShowMessage).toBe("");
  });

  it("verify reducers with action - ALL_SHOWS", () => {
    let data = [
      {
        id: 1,
        name: "Under the Dome",
        genres: ["Drama", "Science-Fiction", "Thriller"],
        rating: { average: 9 },
      },
      {
        id: 2,
        name: "Person of Interest",
        genres: ["Action", "Crime", "Science-Fiction"],
        rating: { average: 8.9 },
      },
    ];
    const result = reducer(state, {
      type: ALL_SHOWS,
      payload: { data: data },
    });
    expect(result.shows[0]).toBe(data[0]);
    expect(result.shows[1]).toBe(data[1]);
  });

  it("verify reducers with action for emtpy data - ALL_SHOWS", () => {
    const result = reducer(state, {
      type: ALL_SHOWS,
      payload: {},
    });
    expect(result.filterShows.length).toBe(0);
    expect(result.shows.length).toBe(0);
  });

  it("verify reducers with action - FILTER_SHOWS", () => {
    let showGenre = ["Action"];

    const result = reducer(state, {
      type: FILTER_SHOWS,
      payload: { showGenre },
    });
    expect(result.selectedGenre).toBe(showGenre);
  });

  it("verify reducers with action with multiple genres - FILTER_SHOWS", () => {
    let showRating = "All";
    let showGenre = ["Action", "Drama"];
    let data = [
      {
        id: 1,
        name: "Under the Dome",
        genres: ["Drama", "Science-Fiction", "Thriller"],
        rating: { average: 6.6 },
      },
      {
        id: 2,
        name: "Person of Interest",
        genres: ["Action", "Crime", "Science-Fiction"],
        rating: { average: 8.9 },
      },
    ];
    state.shows = data;
    const result = reducer(state, {
      type: FILTER_SHOWS,
      payload: { showRating: showRating, showGenre },
    });
    expect(result.selectedGenre[0]).toBe(showGenre[0]);
    expect(result.selectedGenre[1]).toBe(showGenre[1]);
  });

  it("verify reducers with action with default genres - FILTER_SHOWS", () => {

    let showGenre = ["Drama"];
    let data = [
      {
        id: 1,
        name: "Under the Dome",
        genres: ["Drama", "Science-Fiction", "Thriller"],
        rating: { average: 9.1 },
      },
      {
        id: 2,
        name: "Person of Interest",
        genres: ["Action", "Crime", "Science-Fiction"],
        rating: { average: 8.9 },
      },
    ];
    state.shows = data;
    const result = reducer(state, {
      type: FILTER_SHOWS,
      payload: { showGenre },
    });


    expect(result.filterShows[0].name).toBe(data[0].name);
    expect(result.filterShows.length).toBe(1);
  });

  it("verify reducers with action - CLEAR_FILTER_SHOWS", () => {
    const result = reducer(state, {
      type: CLEAR_FILTER_SHOWS,
    });
    expect(result.filterShows).toHaveLength(0);
  });

  it("verify reducers with action - SET_SEARCHKEY", () => {
    let data = "hello";
    const result = reducer(state, {
      type: SET_SEARCHKEY,
      payload: data,
    });
    expect(result.searchKey).toBe(data);
  });


  it("verify reducers with action - SET_GENRE", () => {
    let data = ["Action"];
    const result = reducer(state, {
      type: SET_GENRE,
      payload: data,
    });
    expect(result.selectedGenre).toBe(data);
  });

  it("verify reducers with action - SET_EPISODES", () => {
    let data = [
      {
        id: 12192,
        name: "Pilot",
        season: 1,
        number: 1,
      },
    ];
    let snum = "1";
    const result = reducer(state, {
      type: SET_EPISODES,
      payload: { data: data, snum: snum },
    });
    expect(...result.episodesList).toBe(data[0]);
  });

  it("verify reducers with action - SELECT_EPISODE", () => {
    let data = [
      {
        id: 12192,
        name: "Pilot",
        season: 1,
        number: 1,
      },
    ];
    let snum = "1";
    let epnum = "1";
    const result = reducer(state, {
      type: SET_EPISODES,
      payload: { data: data, snum: snum },
    });
    const result2 = reducer(result, {
      type: SELECT_EPISODE,
      payload: { epnum: epnum, snum: snum },
    });
    expect(result2.selectedEpisode).toBe(data[0]);
  });

  it("verify reducers with action when episode is invalid - SELECT_EPISODE", () => {
    let data = [
      {
        id: 12192,
        name: "Pilot",
        season: 1,
        number: 1,
      },
    ];
    let snum = "1";
    let epnum = "99";
    const result = reducer(state, {
      type: SET_EPISODES,
      payload: { data: data, snum: snum },
    });
    const result2 = reducer(result, {
      type: SELECT_EPISODE,
      payload: { epnum: epnum, snum: snum },
    });
    expect(result2.errorDisplay).toBe(true);
    expect(result2.errorMessage).toBe("Requested season or episode number not found");
  });


  
  it("verify reducers with action when episode is invalid - ERROR_RESPONSE", () => {
    let data={status:404,statusText:"Not Found"};
    const result = reducer(state, {
      type: ERROR_RESPONSE,
      payload: { response: data},
    });
    expect(result.errorDisplay).toBe(true);
    expect(result.errorMessage).toBe(data.statusText);
  });

  it("verify reducers with action when episode is invalid - ERROR_RESPONSE", () => {
    let data={status:304};
    const result = reducer(state, {
      type: ERROR_RESPONSE,
      payload: { response: data},
    });
    expect(result.errorDisplay).toBe(true);
    expect(result.errorMessage).toBe("Something Went Wrong!");
  });


  it("verify reducers with out action", () => {
    const result = reducer(state, {
      type: "NA",
    });
    expect(result).toBe(state);
  });
});
