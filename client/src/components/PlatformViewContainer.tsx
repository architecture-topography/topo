import gql from "graphql-tag";
import { Query } from "react-apollo";
import PlatformView from "./PlatformView";
import React, { Component } from "react";

export const GET_PLATFORMS = gql`
  {
    platforms {
      name
      id
      domains {
        id
        name
      }
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

          // added for nicer display formatting until we do something about the capabilities - CAN DELETE THIS WHEN WE DO SOMETHING ABOUT CAPABILITIES
          data.platforms.map((platform: any) => {
            platform.domains.map((domain: any) => {
              if (!domain.capabiltiies) {
                domain.capabilities = [
                  { name: "Capability 1", order: 1 },
                  { name: "Capability 2", order: 2 },
                  { name: "Capability 3", order: 3 }
                ];
              }
            });
          });

          return <PlatformView treasureMapData={data} />;
        }}
      </Query>
    );
  }
}
