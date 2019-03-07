import { Platform, Context } from "../domain";

const System = {
  id: async (parent: Platform) => {
    return parent.uid;
  },
  domains: async (parent: Platform, _args: null, context: Context) => {
    return context.queries.findDomainsByPlatformId(parent.uid);
  }
};

export default System;
