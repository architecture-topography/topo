import gql from "graphql-tag";
import { Query } from "react-apollo";
import PlatformView from "./PlatformView";
import React, { Component } from "react";

export const GET_PLATFORMS = gql`
  {
    platforms {
      name
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
          return JSON.stringify(data);
        }}
      </Query>
    );
  }
}