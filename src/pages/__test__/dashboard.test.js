import React from "react";

import renderer from "react-test-renderer";
import ShowContext from "../../reducers/showContext";
import Dashboardpage from "./../Dashboardpage";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { createMuiTheme } from "@material-ui/core";


describe(" verify dashboard", () => {
 
  it("renders correctly", () => {
    const searchShows = jest.fn();
    const setSearchKey = jest.fn();
    const getAllShows = jest.fn();
    const setSelectedRating = jest.fn();
    const setSelectedGenre = jest.fn();
    const mockUseContext = jest.fn().mockImplementation(() => ({
      selectedGenre: [],
    }));
    const theme = createMuiTheme();

    React.useContext = mockUseContext;

    const tree = renderer
      .create(
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <ShowContext.Provider
              value={{
                searchShows,
                setSearchKey,
                getAllShows,
                setSelectedRating,
                setSelectedGenre,
              }}
            >
              <Dashboardpage />
            </ShowContext.Provider>
          </ThemeProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    //   expect(screen.getByText("Hello stranger!")).toBeInTheDocument();
  });
});
