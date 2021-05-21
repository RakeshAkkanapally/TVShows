import ratings from "../ratings.json";

describe("ratings",()=>{
it("ratings should be defined",()=>{
    expect(ratings).toBeDefined();
}),
it("verify ratings length should be 10",()=>{
    expect(ratings.length).toBe(10);
});
});