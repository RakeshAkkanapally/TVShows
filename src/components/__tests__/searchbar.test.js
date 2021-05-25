import React from "react";
import renderer from "react-test-renderer";
import Searchbar from "../Searchbar";
import ShowContext from "../../reducers/showContext";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe("Verifying Search bar component", () => {
  const searchShows = jest.fn();
  const setSearchKey = jest.fn();
  const getAllShows = jest.fn();
  const setSelectedRating = jest.fn();
  const setSelectedGenre = jest.fn();

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ShowContext.Provider
          value={{
            searchShows,
            setSearchKey,
            getAllShows,
            setSelectedRating,
            setSelectedGenre,
          }}
        >
          <Searchbar />
        </ShowContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("verify Search text entered by user", () => {
    render(
      <ShowContext.Provider
        value={{
          searchShows,
          setSearchKey,
          getAllShows,
          setSelectedRating,
          setSelectedGenre,
        }}
      >
        <Searchbar />
      </ShowContext.Provider>
    );
    userEvent.type(screen.getByTestId("search"), "Hello, World!");
    expect(screen.getByTestId("search")).toHaveValue("Hello, World!");
  });

  it("verify Search text entered by user and click search Icon", () => {
    render(
      <ShowContext.Provider
        value={{
          searchShows,
          setSearchKey,
          getAllShows,
          setSelectedRating,
          setSelectedGenre,
        }}
      >
        <Searchbar />
      </ShowContext.Provider>
    );
    userEvent.type(screen.getByTestId("search"), "Hello, World!");
    userEvent.click(screen.getByTestId("searchIcon"));
    expect(screen.getByTestId("search")).toHaveValue("Hello, World!");
  });

  it("verify when user clear the search box", () => {
    render(
      <ShowContext.Provider
        value={{
          searchShows,
          setSearchKey,
          getAllShows,
          setSelectedRating,
          setSelectedGenre,
        }}
      >
        <Searchbar />
      </ShowContext.Provider>
    );

    userEvent.type(screen.getByTestId("search"), "Hello, World!");
    userEvent.click(screen.getByTestId("searchIcon"));
    userEvent.clear(screen.getByTestId("search"));
    expect(screen.getByTestId("search")).toHaveAttribute("value", "");
  });
});
