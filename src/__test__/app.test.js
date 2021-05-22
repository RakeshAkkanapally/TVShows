import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import ShowContext from "../reducers/showContext";
import App from "../App";

it("App renders correctly", () => {

  const tree = renderer
    .create(
      <ShowContext.Provider value={ShowContext}> 
      <BrowserRouter>
      <App />
    </BrowserRouter>
    </ShowContext.Provider>
     
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
