export interface Domain {
  id: string;
  name: string;
  capabilities: Capability[];
}

export interface Capability {
  id: string;
  name: string;
}

export interface Platform {
  id: string;
  name: string;
  domains: Domain[];
}

export interface Context {
  queries: {
    findPlatforms: Function;
  };
}
