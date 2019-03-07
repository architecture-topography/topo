import { Capability } from "../domain";

const System = {
  id: async (parent: Capability) => {
    return parent.uid;
  }
};

export default System;
