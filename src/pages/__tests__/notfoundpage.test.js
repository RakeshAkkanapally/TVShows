import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import NotFoundpage from "../NotFoundpage";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <NotFoundpage />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
