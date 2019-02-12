/**
 * Copyright 2018 Thoughtworks Inc. All rights reserved.
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

import gql from "graphql-tag";
import React from "react";
import { Query } from "react-apollo";
import SystemList from "./SystemList";

export const GET_SYSTEMS = gql`
  query Systems($capabilityId: String!) {
    systems(capabilityId: $capabilityId) {
      name
      id
      technologies {
        name
        id
      }
    }
  }
`;

const SystemListWithData = (props: { capabilityId: string }) => {
  return (
    <Query query={GET_SYSTEMS} variables={{ capabilityId: props.capabilityId }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! Getting systems`;

        return <SystemList systems={data.systems} />;
      }}
    </Query>
  );
};

export default SystemListWithData;
