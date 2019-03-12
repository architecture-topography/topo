/*
 * Copyright 2018-2019 Thoughtworks Inc. All rights reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
