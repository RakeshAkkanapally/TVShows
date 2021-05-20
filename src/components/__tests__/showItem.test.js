import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Showitem from "../Showitem";

describe("verifying ShowItem component",()=>{

  it("renders correctly", () => {
    let props={
      "id": 1,
      "name": "Under the Dome",
      "genres": [
        "Drama",
        "Science-Fiction",
        "Thriller"
      ],
      "rating": {
        "average": 6.6
      },
      "image": {
        "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
      }
    };
    const tree = renderer
      .create(
        <BrowserRouter>
          <Showitem {...props}/>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it("renders correctly when few props are not passed", () => {

    let props={
      "id": 1,
      "url": "https://www.tvmaze.com/shows/1/under-the-dome",
      "name": "Under the Dome",
      "rating": {}
    };
    const tree = renderer
      .create(
        <BrowserRouter>
          <Showitem {...props}/>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});