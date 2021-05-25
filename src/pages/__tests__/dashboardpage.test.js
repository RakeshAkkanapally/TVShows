import React from "react";
import { BrowserRouter } from "react-router-dom";
import ShowContext from "../../reducers/showContext";
import Dashboardpage from "./../Dashboardpage";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("verify dashboard page", () => {
  it("verify rating and genre are displayed on launch", () => {
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

    jest.spyOn(React, "useEffect");
    const searchShows = jest.fn();
    const setSearchKey = jest.fn();
    const getAllShows = jest.fn();
    const setSelectedRating = jest.fn();
    const setSelectedGenre = jest.fn();
    const dummyValue = {
      selectedGenre: ["Action", "Drama"],
      searchShows: jest.fn(),
      selectedRating: ["All"],
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

  it("verify rating and genre are modified from dashboard page", async () => {
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
    jest.spyOn(React, "useEffect");
    //jest.spyOn(Dashboardpage, "handleChangeRating");
    const searchShows = jest.fn();
    const setSearchKey = jest.fn();
    const getAllShows = jest.fn();
    // const setSelectedRating =jest.fn();
    const setSelectedGenre = jest.fn();
    const dummyValue = {
      selectedGenre: ["Action", "Drama"],
      searchShows: jest.fn(),
      selectedRating: ["All"],
    };
    render(
      <BrowserRouter>
        <ShowContext.Provider value={dummyValue}>
          <Dashboardpage {...match} />
        </ShowContext.Provider>
      </BrowserRouter>
    );

    screen.debug(screen.getByTestId("select-rating"));
    // let element=screen.getByTestId("select-rating");
    // fireEvent.click(element);
    // screen.debug();
    // await waitFor(() => {
    userEvent.click(screen.getByText("All"));
    userEvent.click(screen.getByText("> 9"));
    expect(screen.getByTestId("select-rating").innerHTML).toContain("> 9");

    //});

    // expect(screen.getByTestId("search")).toHaveAttribute("value","");
    //   expect(screen.getByTestId("select-rating").innerHTML).toContain("> 9");
    // expect(screen.getByTestId("select-genre").innerHTML).toContain("Action,Drama");
  });
});
