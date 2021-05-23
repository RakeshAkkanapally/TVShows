import React from "react";
import axios from "axios";
import { tvShowService } from "../tvShowServices";

jest.mock("axios");

describe("verify all service calls", () => {
  const _tvShowService = new tvShowService();

  it("verify get all shows response", async () => {
    const data = {
      data: [
        {
          id: 1,
          url: "https://www.tvmaze.com/shows/1/under-the-dome",
          name: "Under the Dome",
          type: "Scripted",
          language: "English",
          genres: ["Drama", "Science-Fiction", "Thriller"],
          status: "Ended",
          runtime: 60,
        },
      ],
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const result = await _tvShowService.getAllShows();
    expect(result.data).toBeDefined();
    expect(result.data[0].name).toBe("Under the Dome");
  });

  it("fetches erroneously data from an API", async () => {
    const errorMessage = "Network Error";
    try {
      axios.get.mockImplementationOnce(() => Promise.reject(errorMessage));
      const result = await _tvShowService.getAllShows();
    } catch (e) {
      expect(e).toBe(errorMessage);
    }
  });



  it("verify search a show response", async () => {
    const data = {
     "id":139,"url":"https://www.tvmaze.com/shows/139/girls","name":"Girls","type":"Scripted","language":"English","genres":["Drama","Romance"],"status":"Ended","runtime":30,"premiered":"2012-04-15","officialSite":"http://www.hbo.com/girls","schedule":{"time":"22:00","days":["Sunday"]},"rating":{"average":6.6},"weight":92,"network":{"id":8,"name":"HBO","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"dvdCountry":null,"externals":{"tvrage":30124,"thetvdb":220411,"imdb":"tt1723816"},"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg"},"summary":"<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>","updated":1611310521,"_links":{"self":{"href":"https://api.tvmaze.com/shows/139"},"previousepisode":{"href":"https://api.tvmaze.com/episodes/1079686"}}};
    

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const result = await _tvShowService.getSearchShow("girls");
    expect(result.name).toBeDefined();
    expect(result.name).toBe("Girls");
  });

  it("fetches erroneously data from an API for Search shows", async () => {
    const errorMessage = "Network Error";
    try {
      axios.get.mockImplementationOnce(() => Promise.reject(errorMessage));
      const result = await _tvShowService.getSearchShow();
    } catch (e) {
      expect(e).toBe(errorMessage);
    }
  });


  it("verify a single show response", async () => {
    const data = {"id":169,"url":"https://www.tvmaze.com/shows/169/breaking-bad","name":"Breaking Bad","type":"Scripted","language":"English","genres":["Drama","Crime","Thriller"],"status":"Ended","runtime":60,"premiered":"2008-01-20","officialSite":"http://www.amc.com/shows/breaking-bad","schedule":{"time":"22:00","days":["Sunday"]},"rating":{"average":9.2},"weight":94,"network":{"id":20,"name":"AMC","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"dvdCountry":null,"externals":{"tvrage":18164,"thetvdb":81189,"imdb":"tt0903747"},"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/0/2400.jpg"},"summary":"<p><b>Breaking Bad</b> follows protagonist Walter White, a chemistry teacher who lives in New Mexico with his wife and teenage son who has cerebral palsy. White is diagnosed with Stage III cancer and given a prognosis of two years left to live. With a new sense of fearlessness based on his medical prognosis, and a desire to secure his family's financial security, White chooses to enter a dangerous world of drugs and crime and ascends to power in this world. The series explores how a fatal diagnosis such as White's releases a typical man from the daily concerns and constraints of normal society and follows his transformation from mild family man to a kingpin of the drug trade.</p>","updated":1610551143,"_links":{"self":{"href":"https://api.tvmaze.com/shows/169"},"previousepisode":{"href":"https://api.tvmaze.com/episodes/2007806"}}};
    

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const result = await _tvShowService.getSingleShow("Breaking Bad");
    expect(result.name).toBeDefined();
    expect(result.name).toBe("Breaking Bad");
  });

  it("fetches erroneously data from an API for single shows", async () => {
    const errorMessage = "Network Error";
    try {
      axios.get.mockImplementationOnce(() => Promise.reject(errorMessage));
      const result = await _tvShowService.getSingleShow();
    } catch (e) {
      expect(e).toBe(errorMessage);
    }
  });
  
  it("verify a seasons response of a show", async () => {
    const data = [
      {"id":1,"url":"https://www.tvmaze.com/seasons/1/under-the-dome-season-1","number":1,"name":"","episodeOrder":13,"premiereDate":"2013-06-24","endDate":"2013-09-16","network":{"id":2,"name":"CBS","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/24/60941.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/24/60941.jpg"},"summary":"","_links":{"self":{"href":"https://api.tvmaze.com/seasons/1"}}}
    ];

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const result = await _tvShowService.getSeasons("1");
    expect(result[0].id).toBeDefined();
    expect(result[0].id).toBe(1);
  });

  it("fetches erroneously data from an API for seasons of a show", async () => {
    const errorMessage = "Network Error";
    try {
      axios.get.mockImplementationOnce(() => Promise.reject(errorMessage));
      const result = await _tvShowService.getSeasons();
    } catch (e) {
      expect(e).toBe(errorMessage);
    }
  });
  
  it("verify a seasons response of a show", async () => {
    const data = [
      {"id":1,"url":"https://www.tvmaze.com/episodes/1/under-the-dome-1x01-pilot","name":"Pilot","season":1,"number":1,"type":"regular","airdate":"2013-06-24","airtime":"22:00","airstamp":"2013-06-25T02:00:00+00:00","runtime":60,"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_landscape/1/4388.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/1/4388.jpg"},"summary":"<p>When the residents of Chester's Mill find themselves trapped under a massive transparent dome with no way out, they struggle to survive as resources rapidly dwindle and panic quickly escalates.</p>","_links":{"self":{"href":"https://api.tvmaze.com/episodes/1"}}}    
    ];
    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const result = await _tvShowService.getEpisode("1");
    expect(result[0].name).toBeDefined();
    expect(result[0].name).toBe(data[0].name);
  });

  it("fetches erroneously data from an API for seasons of a show", async () => {
    const errorMessage = "Network Error";
    try {
      axios.get.mockImplementationOnce(() => Promise.reject(errorMessage));
      const result = await _tvShowService.getEpisode();
    } catch (e) {
      expect(e).toBe(errorMessage);
    }
  });
  it("verify a genres response of a show", async () => {
    const data = {
      data: [
        {
          id: 1,
          url: "https://www.tvmaze.com/shows/1/under-the-dome",
          name: "Under the Dome",
          type: "Scripted",
          language: "English",
          genres: ["Drama", "Science-Fiction", "Thriller"],
          status: "Ended",
          runtime: 60,
        },
      ],
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const result = await _tvShowService.getGenresAllShows();
    expect(result.data).toBeDefined();
    expect(result.data[0].name).toBe("Under the Dome");
  });

  it("fetches erroneously data from an API for genres of a show", async () => {
    const errorMessage = "Network Error";
    try {
      axios.get.mockImplementationOnce(() => Promise.reject(errorMessage));
      const result = await _tvShowService.getGenresAllShows();
    } catch (e) {
      expect(e).toBe(errorMessage);
    }
  });
});
