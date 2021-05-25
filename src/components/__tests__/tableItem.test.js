import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Tableitem from "./../Tableitem";

describe("verifying TableItem component",()=>{

  it("TableItem component renders correctly", () => {
    let props={
      "headerRow": { name: "Title", value: "Title" },
      "rows": [{ name: "row", value:"value" }],
      "innerHTMLRow": [{ name: "Summary", value:"summary" }]
    };

    const tree = renderer
      .create(
        <BrowserRouter>
          <Tableitem {...props}/>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("TableItem renders correctly", () => {
    let props={
      "headerRow": { name: "Title", value: "Title" },
      "rows": [{ name: "Row", value: "Title" }],
      "innerHTMLRow": [{ name: "Summary", value: "Summary" }]
    };

    const tree = renderer
      .create(
        <BrowserRouter>
          <Tableitem {...props}/>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  
});