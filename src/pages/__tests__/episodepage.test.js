import React from "react";
import { BrowserRouter } from "react-router-dom";
import ShowContext from "../../reducers/showContext";
import Dashboardpage from "../Dashboardpage";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Episodepage from "./../Episodepage";

describe("verify episode page", () => {
  it("verify episode details displayed on launch", () => {
    let match = {
      location: {
        pathname: "/search",
        search: "?q=dark",
        hash: "",
        key: "sj9vzt",
      },
      match: {
        path: "/search",
        url: "/search",
        isExact: true,
        params: { id: "169", snum: "1", epnum: "1" },
      },
    };

    //jest.spyOn(React, "useEffect");
    const searchShows = jest.fn();
    const setSearchKey = jest.fn();
    const getAllShows = jest.fn();
    const setSelectedRating = jest.fn();
    const setSelectedGenre = jest.fn();
    const dummyValue = {
      selectedGenre: ["Action", "Drama"],
      searchShows: jest.fn(),
      selectedRating: ["All"],
      episodeList: [
        {
          id: 12192,
          url: "https://www.tvmaze.com/episodes/12192/breaking-bad-1x01-pilot",
          name: "Pilot",
          season: 1,
          number: 1,
          type: "regular",
          airdate: "2008-01-20",
          airtime: "22:00",
          airstamp: "2008-01-21T03:00:00+00:00",
          runtime: 60,
          image: {
            medium:
              "https://static.tvmaze.com/uploads/images/medium_landscape/23/59145.jpg",
            original:
              "https://static.tvmaze.com/uploads/images/original_untouched/23/59145.jpg",
          },
          summary:
            "<p>A high-school chemistry teacher (Bryan Cranston) is diagnosed with a deadly cancer, so he puts his expertise to use and teams with an ex-student (Aaron Paul) to manufacture top-grade crystal meth in hopes of providing for his family after he's gone.</p>",
          _links: { self: { href: "https://api.tvmaze.com/episodes/12192" } },
        },
      ],
      selectedEpisode: [],
    };
    render(
      <BrowserRouter>
        <ShowContext.Provider value={dummyValue}>
          <Episodepage {...match} />
        </ShowContext.Provider>
      </BrowserRouter>
    );
    //   newState.selectedEpisode);episodesList
    //   const state = initialState;
    //   let data=[{"id":12192,"url":"https://www.tvmaze.com/episodes/12192/breaking-bad-1x01-pilot","name":"Pilot","season":1,"number":1,"type":"regular","airdate":"2008-01-20","airtime":"22:00","airstamp":"2008-01-21T03:00:00+00:00","runtime":60,"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_landscape/23/59145.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/23/59145.jpg"},"summary":"<p>A high-school chemistry teacher (Bryan Cranston) is diagnosed with a deadly cancer, so he puts his expertise to use and teams with an ex-student (Aaron Paul) to manufacture top-grade crystal meth in hopes of providing for his family after he's gone.</p>","_links":{"self":{"href":"https://api.tvmaze.com/episodes/12192"}}}];
    //   let snum="1";
    //   const result = reducer(state, {
    //       type: SET_EPISODES,
    //       payload: { data: data, snum: snum }
    //     });
    //   expect(...result.episodesList).toBe(data[0]);
    // expect(screen.getByText().innerHTML).toContain("All");
    // expect(screen.getByTestId("select-genre").innerHTML).toContain("Action,Drama");
  });
});
