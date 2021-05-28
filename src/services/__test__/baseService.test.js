import { BaseService } from "../baseService";
import { baseUrl, showsURI } from "./../serviceEndpoints";

describe("verify base service class", () => {
  it("verify get request", async () => {
    const base = new BaseService();
    const addMock = jest.spyOn(base, "get");

    const result = addMock(baseUrl, showsURI);
    await expect(result).resolves.toHaveProperty("data");
    const result2 = addMock(baseUrl + showsURI);
    await expect(result2).resolves.toHaveProperty("data");
  });
});
