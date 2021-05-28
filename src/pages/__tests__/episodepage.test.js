import React from "react";
import { BrowserRouter } from "react-router-dom";
import ShowContext from "../../reducers/showContext";
import { render, screen } from "@testing-library/react";
import Episodepage from "./../Episodepage";

describe("verify episode page", () => {
  it("verify episode details displayed", async () => {
    let match = {
      match: {
        path: "/search",
        url: "/search",
        isExact: true,
        params: { id: "169", snum: "1", epnum: "1" },
      },
    };

    const selectedEpisode = {
      id: 12192,
      name: "Pilot",
      season: 1,
      number: 1,
      genres: ["Drama", "Science-Fiction", "Thriller"],
      rating: {
        average: 6.6,
      },
    };
    let data = [
      {
        id: 12192,
        name: "Pilot",
        season: 1,
        number: 1
      },
      {
        id: 12193,
        name: "Cat's in the Bag...",
        season: 1,
        number: 2,
      },
    ];
    const dummyValue = {
      selectedGenre: ["Action", "Drama"],
      episodesList: data,
      selectedEpisode: selectedEpisode,
      getEpisodeDetails: jest.fn(),
      selectEpisode: jest.fn(),
    };
    render(
      <BrowserRouter>
        <ShowContext.Provider value={dummyValue}>
          <Episodepage {...match} />
        </ShowContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getAllByText("Pilot")).toBeInTheDocument;
  });

  it("verify episode details when image is not present ", async () => {
    let match = {
      match: {
        path: "/search",
        url: "/search",
        isExact: true,
        params: { id: "169", snum: "1", epnum: "1" },
      },
    };

    const selectedEpisode = {
      id: 12192,
      url: "",
      name: "Pilot",
      season: 1,
      number: 1
    };
    const dummyValue = {
      selectedGenre: ["Action", "Drama"],
      selectedEpisode: selectedEpisode,
      getEpisodeDetails: jest.fn(),
      selectEpisode: jest.fn(),
    };
    render(
      <BrowserRouter>
        <ShowContext.Provider value={dummyValue}>
          <Episodepage {...match} />
        </ShowContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(selectedEpisode.name)).toBeInTheDocument;
  });
});
