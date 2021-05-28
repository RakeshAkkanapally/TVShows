import React from "react";
import { BrowserRouter } from "react-router-dom";
import ShowContext from "../../reducers/showContext";
import { render, screen } from "@testing-library/react";
import Showpage from "./../Showpage";

describe("verify show page", () => {
  it("verify show page details displayed", async () => {
    let match = {
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
      number: 1
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

  it("verify show page details displayed with multiple seasons", async () => {
    let match = {
      match: {
        path: "/search",
        url: "/search",
        isExact: true,
        params: { id: "169", snum: "1", epnum: "1" },
      },
    };

    const selectedShow = {
      id: 1,
      name: "Pilot",
      season: 1,
      number: 1,
      genres: ["Drama", "Science-Fiction", "Thriller"],
      rating: {
        average: 6.6,
      }
    };

    let data = [
      {
        id: 753,
        number: 1,
        name: "",
        episodeOrder: 1        
      },
      {
        id: 754,
        number: 2,
        name: "",
        episodeOrder: 2
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
