import reducer from "./../reducer";
import {SELECT_EPISODE,ADD_ALERT, ALL_SHOWS, CLEAR_FILTER_SHOWS, CLEAR_SHOW, FILTER_SHOWS, IS_LOADING, REMOVE_ALERT, SEARCH_SHOWS, SET_EPISODES, SET_GENRE, SET_RATING, SET_SEARCHKEY, SET_SEASON, SET_SHOW} from "./../actions";
import  initialState  from "./../initialState.js";


describe("verify reducer page", () => {

  it("verify reducers with value - SEARCH_SHOWS", () => {
    const state = initialState;
    let data = [{
      score: 14.592261,
      show: {
        id: 49334,
        url: "https://www.tvmaze.com/shows/49334/shining-girls",
        name: "Shining Girls",
        type: "Scripted"
      }
    }];
    const result = reducer(state, {
      type: SEARCH_SHOWS,
      payload: { data: data, searchShow:"girls" },
    });
     expect(...result.filterShows).toBe(data[0].show);
  });

  it("verify reducers with value - IS_LOADING", () => {
    const state = initialState;
    const result = reducer(state, {
      type: IS_LOADING,
    });
     expect(result.loading).toBe(true);
  });

  it("verify reducers with value - SET_SHOW", () => {
    const state = initialState;
    let data = {"id":169,"url":"https://www.tvmaze.com/shows/169/breaking-bad","name":"Breaking Bad","type":"Scripted","language":"English","genres":["Drama","Crime","Thriller"],"status":"Ended","runtime":60,"premiered":"2008-01-20","officialSite":"http://www.amc.com/shows/breaking-bad","schedule":{"time":"22:00","days":["Sunday"]},"rating":{"average":9.2},"weight":94,"network":{"id":20,"name":"AMC","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"dvdCountry":null,"externals":{"tvrage":18164,"thetvdb":81189,"imdb":"tt0903747"},"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/0/2400.jpg"},"summary":"<p><b>Breaking Bad</b> follows protagonist Walter White, a chemistry teacher who lives in New Mexico with his wife and teenage son who has cerebral palsy. White is diagnosed with Stage III cancer and given a prognosis of two years left to live. With a new sense of fearlessness based on his medical prognosis, and a desire to secure his family's financial security, White chooses to enter a dangerous world of drugs and crime and ascends to power in this world. The series explores how a fatal diagnosis such as White's releases a typical man from the daily concerns and constraints of normal society and follows his transformation from mild family man to a kingpin of the drug trade.</p>","updated":1610551143,"_links":{"self":{"href":"https://api.tvmaze.com/shows/169"},"previousepisode":{"href":"https://api.tvmaze.com/episodes/2007806"}}};
    const result = reducer(state, {
      type: SET_SHOW,
      payload:  data
    });

     expect(result.selectedShow).toBe(data);
  });

    
  it("verify reducers with value - SET_SEASON", () => {
    const state = initialState;
    let data = [{"id":753,"url":"https://www.tvmaze.com/seasons/753/breaking-bad-season-1","number":1,"name":"","episodeOrder":7,"premiereDate":"2008-01-20","endDate":"2008-03-09","network":{"id":20,"name":"AMC","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/231/579726.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/231/579726.jpg"},"summary":null,"_links":{"self":{"href":"https://api.tvmaze.com/seasons/753"}}}];
    const result = reducer(state, {
      type: SET_SEASON,
      payload: data
    });
     expect(result.seasonsList).toBe(data);
  });

  it("verify reducers with value - CLEAR_SHOW", () => {
    const state = initialState;
    const result = reducer(state, {
      type: CLEAR_SHOW
    });
    expect(result.selectedShow).toHaveLength(0);
  });


      
  it("verify reducers with value - ADD_ALERT", () => {
    const state = initialState;
    let message = "No Season Details Found!";
       const result = reducer(state, {
        type: ADD_ALERT,
        payload: { display: true, message: message },
      });
     expect(result.alertShow).toBe(true);
     expect(result.alertShowMessage).toBe(message);
  });

  it("verify reducers with value - CLEAR_SHOW", () => {
    const state = initialState;
    const result = reducer(state, {
      type: REMOVE_ALERT
    });
    expect(result.alertShow).toBe(false);
    expect(result.alertShowMessage).toBe("");
  });

  it("verify reducers with action - ALL_SHOWS", () => {
    const state = initialState;
    let data =[{"id":1,"url":"https://www.tvmaze.com/shows/1/under-the-dome","name":"Under the Dome","type":"Scripted","language":"English","genres":["Drama","Science-Fiction","Thriller"],"status":"Ended","runtime":60,"averageRuntime":60,"premiered":"2013-06-24","officialSite":"http://www.cbs.com/shows/under-the-dome/","schedule":{"time":"22:00","days":["Thursday"]},"rating":{"average":6.6},"weight":96,"network":{"id":2,"name":"CBS","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"dvdCountry":null,"externals":{"tvrage":25988,"thetvdb":264492,"imdb":"tt1553656"},"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"},"summary":"<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>","updated":1621201742,"_links":{"self":{"href":"https://api.tvmaze.com/shows/1"},"previousepisode":{"href":"https://api.tvmaze.com/episodes/185054"}}}];
       const result = reducer(state, {
        type: ALL_SHOWS,
        payload: {data:data}
      });
     expect(...result.filterShows).toBe(data[0]);
     expect(...result.shows).toBe(data[0]);
  });

  it("verify reducers with action - FILTER_SHOWS", () => {
    const state = initialState;
    let showRating="All";
    let showGenre=["Action"];
    const result = reducer(state, {
        type: FILTER_SHOWS,
        payload: { showRating:showRating, showGenre }
      });
    expect(result.selectedRating).toBe(showRating);
    expect(result.selectedGenre).toBe(showGenre);
  });
  
  it("verify reducers with action - CLEAR_FILTER_SHOWS", () => {
    const state = initialState;
    const result = reducer(state, {
        type: CLEAR_FILTER_SHOWS,
      });
    expect(result.filterShows).toHaveLength(0);
  });
  
  it("verify reducers with action - SET_SEARCHKEY", () => {
    const state = initialState;
    let data="hello";
    const result = reducer(state, {
        type: SET_SEARCHKEY,
        payload: data
      });
    expect(result.searchKey).toBe(data);
  });

  it("verify reducers with action - SET_RATING", () => {
    const state = initialState;
    let data="All";
    const result = reducer(state, {
        type: SET_RATING,
        payload: data
      });
    expect(result.selectedRating).toBe(data);
  });

  it("verify reducers with action - SET_GENRE", () => {
    const state = initialState;
    let data=["Action"];
    const result = reducer(state, {
        type: SET_GENRE,
        payload: data
      });
    expect(result.selectedGenre).toBe(data);
  });

  it("verify reducers with action - SET_EPISODES", () => {
    const state = initialState;
    let data=[{"id":12192,"url":"https://www.tvmaze.com/episodes/12192/breaking-bad-1x01-pilot","name":"Pilot","season":1,"number":1,"type":"regular","airdate":"2008-01-20","airtime":"22:00","airstamp":"2008-01-21T03:00:00+00:00","runtime":60,"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_landscape/23/59145.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/23/59145.jpg"},"summary":"<p>A high-school chemistry teacher (Bryan Cranston) is diagnosed with a deadly cancer, so he puts his expertise to use and teams with an ex-student (Aaron Paul) to manufacture top-grade crystal meth in hopes of providing for his family after he's gone.</p>","_links":{"self":{"href":"https://api.tvmaze.com/episodes/12192"}}}];
    let snum="1";
    const result = reducer(state, {
        type: SET_EPISODES,
        payload: { data: data, snum: snum }
      });
    expect(...result.episodesList).toBe(data[0]);
  });

  it("verify reducers with action - SELECT_EPISODE", () => {
    const state = initialState;
    let data=[{"id":12192,"url":"https://www.tvmaze.com/episodes/12192/breaking-bad-1x01-pilot","name":"Pilot","season":1,"number":1,"type":"regular","airdate":"2008-01-20","airtime":"22:00","airstamp":"2008-01-21T03:00:00+00:00","runtime":60,"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_landscape/23/59145.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/23/59145.jpg"},"summary":"<p>A high-school chemistry teacher (Bryan Cranston) is diagnosed with a deadly cancer, so he puts his expertise to use and teams with an ex-student (Aaron Paul) to manufacture top-grade crystal meth in hopes of providing for his family after he's gone.</p>","_links":{"self":{"href":"https://api.tvmaze.com/episodes/12192"}}}];
    let snum="1";
    let epnum="1";
    const result = reducer(state, {
        type: SET_EPISODES,
        payload: { data: data, snum: snum }
      });
    const result2 = reducer(result, {
        type: SELECT_EPISODE,
        payload: { epnum:epnum, snum: snum }
      });
    expect(result2.selectedEpisode).toBe(data[0]);
  });

  it("verify reducers with out action", () => {
    const state = initialState;
   
    const result = reducer(state, {
        type: "NA",
      });
   
    expect(result).toBe(state);
  });

  
});
