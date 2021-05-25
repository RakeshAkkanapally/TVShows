import React from "react";
import { BrowserRouter } from "react-router-dom";
import ShowContext from "../../reducers/showContext";
import Dashboardpage from "./../Dashboardpage";
import {  render, screen } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event';

describe("verify dashboard page", () => {

  it("verify dashbard page displayed on launch", () => {
    let match = {
      location: {
        search: ""
      },
      match: {
        path: "/search",
        url: "/search",
        isExact: true,
        params: {},
      },
    };

    const dummyValue = {
      setSearchKey: jest.fn(),
      getAllShows :jest.fn(),
      setSelectedRating: jest.fn(),
      setSelectedGenre: jest.fn(),
      selectedGenre: [],
      selectedRating: ["All"],
    };
    render(
      <BrowserRouter>
        <ShowContext.Provider value={dummyValue}>
          <Dashboardpage {...match} />
        </ShowContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText("TV SHOWS")).toBeInTheDocument;

  });


  it("verify rating and genre can be updated", () => {
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
        params: {},
      },
    };

    const dummyValue = {
      searchShows: jest.fn(),
      selectedRating: ["All"],
      selectedGenre: ["Action", "Drama"],
      alertShow: true,
      loading: true
    };
    render(
      <BrowserRouter>
        <ShowContext.Provider value={dummyValue}>
          <Dashboardpage {...match} />
        </ShowContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByTestId("select-rating").innerHTML).toContain("All");
    expect(screen.getByTestId("select-genre").innerHTML).toContain(
      "Action,Drama"
    );
  });

  
});
