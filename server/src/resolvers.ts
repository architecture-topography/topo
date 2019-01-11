import { Context, Platform } from "./domain";

export default {
  Query: {
    hello: () => "Hello, Topo",
    platforms: async (parent: Platform, args: null, context: Context) => {
      const platforms = await context.queries.findPlatforms();

      return platforms;
    }
  }
};
