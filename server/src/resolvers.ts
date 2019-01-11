import { Platform } from "./domain";

export default {
  Query: {
    hello: () => "Hello, Topo",
    getPlatforms: async (parent: Platform, args: null, context: Function) => {
      const platforms = await context().queries.findPlatforms();

      return platforms;
    }
  }
};
