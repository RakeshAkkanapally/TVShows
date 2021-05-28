import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Showitem from "../ShowItem";

describe("verifying ShowItem component", () => {
  it("ShowItem renders correctly", () => {
    let props = {
      id: 1,
      name: "Under the Dome",
      genres: ["Drama", "Science-Fiction", "Thriller"],
      rating: {
        average: 6.6,
      },
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
      },
      rows: [{ name: "Genre", value: ["Drama", "Action"] }],
      snum: 9,
      epnum: 9,
    };

    const tree = renderer
      .create(
        <BrowserRouter>
          <Showitem {...props} />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly when few props are not passed", () => {
    let props = {
      id: 1,
      url: "show",
      name: "Under the Dome",
      rating: {},
      rows: [{ name: "Genre" }],
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
      },
    };
    const tree = renderer
      .create(
        <BrowserRouter>
          <Showitem {...props} />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly when few props are not passed", () => {
    let props = {
      id: 1,
      url: "show",
      name: "Under the Dome",
      rating: {},
      rows: [{ name: "Genre" }],
    };
    const tree = renderer
      .create(
        <BrowserRouter>
          <Showitem {...props} />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly when few props are not passed.", () => {
    let props = {
      id: 1,
      url: "NA",
      rating: {},
      rows: [{ name: "Genre" }],
    };
    const tree = renderer
      .create(
        <BrowserRouter>
          <Showitem {...props} />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly when few props are not passed.", () => {
    let props = {
      id: 1,
      name: "Under the Dome",
      genres: ["Drama", "Science-Fiction", "Thriller"],
      rating: {
        average: 6.6,
      },
      rows: [{ name: "Genre", value: ["Drama", "Action"] }],
      snum: 9,
      epnum: 9,
    };
    const tree = renderer
      .create(
        <BrowserRouter>
          <Showitem {...props} />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
