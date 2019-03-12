/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Segment } from 'semantic-ui-react';
import PlatformView from './PlatformView';

export const GET_PLATFORMS = gql`
  {
    platforms {
      name
      id
      domains {
        id
        name
        capabilities {
          name
          id
        }
      }
    }
  }
`;

export default class PlatformViewContainer extends Component {
  public render() {
    return (
      <Query query={GET_PLATFORMS}>
        {({ loading, error, data }) => {
          if (loading) {
            return 'Loading...';
          }
          if (error) {
            return (
              <Segment inverted color="red">
                Error connecting to database
              </Segment>
            );
          }
          return <PlatformView treasureMapData={data} />;
        }}
      </Query>
    );
  }
}
