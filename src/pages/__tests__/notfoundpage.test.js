import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import NotFoundpage from "../NotFoundpage";
import ShowContext from "../../reducers/showContext";

it("Not found page renders correctly", () => {
  const dummyValue = {
    errorMessage: "",
  };
  const tree = renderer
    .create(
      <BrowserRouter>
        <ShowContext.Provider value={dummyValue}>
          <NotFoundpage />
        </ShowContext.Provider>
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
