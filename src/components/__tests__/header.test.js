import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Header from "../Header";
import ShowContext from "../../reducers/showContext";



it("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <ShowContext.Provider value={ShowContext}>
          <Header />
        </ShowContext.Provider>
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
