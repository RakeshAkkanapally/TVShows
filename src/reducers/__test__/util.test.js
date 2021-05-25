import { getGenres } from "../util";

describe("to verify utils method", () => {
  it("to verify the set genre method", async () => {
    let genres = await getGenres();
    expect(genres.length).toBeGreaterThan(1);
  });
});
