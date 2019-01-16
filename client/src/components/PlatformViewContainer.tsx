import gql from "graphql-tag";
import { Query } from "react-apollo";
import PlatformView from "./PlatformView";
import React, { Component } from "react";

interface Platform {
  name: string;
  id: string;
}

export const GET_PLATFORMS = gql`
  {
    platforms {
      name
      id
    }
  }
`;

export default class PlatformViewContainer extends Component {
  render() {
    return (
      <Query query={GET_PLATFORMS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const platforms: Platform[] = data.platforms;
          return platforms.map(platform => (
            <h1 key={platform.id}>{platform.name}</h1>
          ));
        }}
      </Query>
    );
  }
}
