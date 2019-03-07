import { Domain, Context } from "../domain";

const System = {
  id: async (parent: Domain) => {
    return parent.uid;
  },
  capabilities: async (parent: Domain, _args: null, context: Context) => {
    return context.queries.findCapabilitiesByDomainId(parent.uid);
  }
};

export default System;
