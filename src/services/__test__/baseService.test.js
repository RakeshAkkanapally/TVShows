import React from "react";
import { BaseService } from "../baseService";
import { ServiceEndPointsList } from "./../serviceEndpoints";

it("verify get request", async() => {
  const base = new BaseService();
  const addMock = jest.spyOn(base, "get");

  let endPoint = ServiceEndPointsList.baseUrl;
  let queryString = ServiceEndPointsList.showsURI;

  const result = addMock(endPoint, queryString);
  await  expect(result).resolves.toHaveProperty("data");
  const result2 = addMock(endPoint+queryString);
  await expect(result2).resolves.toHaveProperty("data");

});
