import React from "react";
import { BrowserRouter } from "react-router-dom";
import ShowContext from "../../reducers/showContext";
import { render, screen } from "@testing-library/react";
import Episodepage from "./../Episodepage";

describe("verify episode page", () => {

  it("verify episode details displayed", async () => {
    let match = {
      location: {
        pathname: "/search"
      },
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
      number: 1,
      type: "regular",
      airdate: "2008-01-20",
      airtime: "22:00",
      airstamp: "2008-01-21T03:00:00+00:00",
      runtime: 60,
      genres: ["Drama", "Science-Fiction", "Thriller"],
      rating: {
        average: 6.6,
      },
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
      }
    };
    let data= [{"id":12192,"url":"https://www.tvmaze.com/episodes/12192/breaking-bad-1x01-pilot","name":"Pilot","season":1,"number":1,"type":"regular","airdate":"2008-01-20","airtime":"22:00","airstamp":"2008-01-21T03:00:00+00:00","runtime":60,"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_landscape/23/59145.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/23/59145.jpg"},"summary":"<p>A high-school chemistry teacher (Bryan Cranston) is diagnosed with a deadly cancer, so he puts his expertise to use and teams with an ex-student (Aaron Paul) to manufacture top-grade crystal meth in hopes of providing for his family after he's gone.</p>","_links":{"self":{"href":"https://api.tvmaze.com/episodes/12192"}}},{"id":12193,"url":"https://www.tvmaze.com/episodes/12193/breaking-bad-1x02-cats-in-the-bag","name":"Cat's in the Bag...","season":1,"number":2,"type":"regular","airdate":"2008-01-27","airtime":"22:00","airstamp":"2008-01-28T03:00:00+00:00","runtime":60,"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_landscape/23/59148.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/23/59148.jpg"},"summary":"<p>After the accident in the desert, Walter and Jesse need to dispose of the unfortunate mess in their rolling lab of an RV, and Skyler begins to suspect that Walter and Jesse are involved in some mysterious goings-on.</p>","_links":{"self":{"href":"https://api.tvmaze.com/episodes/12193"}}}];
    const dummyValue = {
      selectedGenre: ["Action", "Drama"],
      selectedRating: ["All"],
      episodesList:data,
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
      location: {
        pathname: "/search"
      },
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
      number: 1,
      type: "regular",
      airdate: "2008-01-20",
      airtime: "22:00",
      airstamp: "2008-01-21T03:00:00+00:00",
    };
    const dummyValue = {
      selectedGenre: ["Action", "Drama"],
      selectedRating: ["All"],
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
