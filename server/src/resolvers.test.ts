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
          id: "e71278fa-ba70-4043-9a39-9dce0497d5a3",
          name: "TW"
        };
        const stubPlatforms = [platform];

        const mockQueries = {
          findPlatforms: jest.fn().mockResolvedValue(stubPlatforms)
        };
        const stubContext = { queries: mockQueries };

        const platforms = await resolvers.Query.getPlatforms(
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
