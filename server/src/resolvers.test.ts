import resolvers from "./resolvers";

describe("resolvers", () => {
  describe("hello", () => {
    it("returns hello topo", () => {
      expect(resolvers.Query.hello()).toEqual("Hello, Topo");
    });
  });

  describe("platforms", () => {
    describe("getPlatforms", () => {
      it("should return all platforms", async () => {
        const platform = {
          id: "0",
          name: "TW",
          domains: [{ id: "1", name: "test domain" }]
        };
        const stubPlatforms = [platform];

        const mockQueries = {
          findPlatforms: jest.fn().mockResolvedValue(stubPlatforms)
        };
        const stubContext = { queries: mockQueries };

        const platforms = await resolvers.Query.platforms(
          platform,
          null,
          stubContext
        );

        expect(mockQueries.findPlatforms).toHaveBeenCalled();
        expect(platforms).toEqual(stubPlatforms);
      });
    });
  });
});
