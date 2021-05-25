import React from "react";
import { BrowserRouter } from "react-router-dom";
import ShowContext from "../../reducers/showContext";
import { render, screen } from "@testing-library/react";
import Showpage from "./../Showpage";

describe("verify show page", () => {
  it("verify show page details displayed", async () => {
    let match = {
      location: {
        pathname: "/search",
      },
      match: {
        path: "/search",
        url: "/search",
        isExact: true,
        params: { id: "169", snum: "1", epnum: "1" },
      },
    };

    const selectedShow = {
      id: 12192,
      url: "",
      name: "Pilot",
      season: 1,
      number: 1,
      type: "regular",
      airdate: "2008-01-20",
      airtime: "22:00",
      airstamp: "2008-01-21T03:00:00+00:00",
    };
    const dummyValue = {
      getShowDetails: jest.fn(),
      getSeasonDetails: jest.fn(),
      selectedShow: selectedShow,
    };
    render(
      <BrowserRouter>
        <ShowContext.Provider value={dummyValue}>
          <Showpage {...match} />
        </ShowContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(selectedShow.name)).toBeInTheDocument;
  });

  it("verify show page details displayed", async () => {
    let match = {
      location: {
        pathname: "/search",
      },
      match: {
        path: "/search",
        url: "/search",
        isExact: true,
        params: { id: "169", snum: "1", epnum: "1" },
      },
    };

    const selectedShow = {
      id: 1,
      url: "https://www.tvmaze.com/episodes/1/under-the-dome-1x01-pilot",
      name: "Pilot",
      season: 1,
      number: 1,
      type: "regular",
      airdate: "2013-06-24",
      airtime: "22:00",
      airstamp: "2013-06-25T02:00:00+00:00",
      runtime: 60,
      genres: ["Drama", "Science-Fiction", "Thriller"],
      rating: {
        average: 6.6,
      },
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
      },
    };

    let data = [
      {
        id: 753,
        url: "https://www.tvmaze.com/seasons/753/breaking-bad-season-1",
        number: 1,
        name: "",
        episodeOrder: 7,
        premiereDate: "2008-01-20",
        endDate: "2008-03-09",
        network: {
          id: 20,
          name: "AMC",
          country: {
            name: "United States",
            code: "US",
            timezone: "America/New_York",
          },
        },
        webChannel: null,
        image: {
          medium:
            "https://static.tvmaze.com/uploads/images/medium_portrait/231/579726.jpg",
          original:
            "https://static.tvmaze.com/uploads/images/original_untouched/231/579726.jpg",
        },
        summary: null,
        _links: { self: { href: "https://api.tvmaze.com/seasons/753" } },
      },
      {
        id: 754,
        url: "https://www.tvmaze.com/seasons/754/breaking-bad-season-2",
        number: 2,
        name: "",
        episodeOrder: 13,
        premiereDate: "2009-03-08",
        endDate: "2009-05-31",
        network: {
          id: 20,
          name: "AMC",
          country: {
            name: "United States",
            code: "US",
            timezone: "America/New_York",
          },
        },
        webChannel: null,
        image: {
          medium:
            "https://static.tvmaze.com/uploads/images/medium_portrait/231/579727.jpg",
          original:
            "https://static.tvmaze.com/uploads/images/original_untouched/231/579727.jpg",
        },
        summary: null,
        _links: { self: { href: "https://api.tvmaze.com/seasons/754" } },
      },
    ];
    const dummyValue = {
      getShowDetails: jest.fn(),
      getSeasonDetails: jest.fn(),
      selectedShow: selectedShow,
      laoding: true,
      seasonsList: data,
    };
    render(
      <BrowserRouter>
        <ShowContext.Provider value={dummyValue}>
          <Showpage {...match} />
        </ShowContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(selectedShow.name)).toBeInTheDocument;
  });
});
