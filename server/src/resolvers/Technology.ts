import { Technology } from "../domain";

const Technology = {
  id: (parent: Technology) => {
    return parent.uid;
  }
};

export default Technology;
