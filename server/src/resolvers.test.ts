import resolvers from "./resolvers";

describe("hello resolver", () => {
  it("returns hello topo", () => {
    expect(resolvers.Query.hello()).toEqual("Hello, Topo");
  });
});
