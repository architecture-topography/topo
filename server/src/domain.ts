export interface Platform {
  id: string;
  name: string;
}

export interface Context {
  queries: {
    findPlatforms: Function;
  };
}
