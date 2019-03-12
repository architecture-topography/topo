/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import SystemList from './SystemList';

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
        if (loading) {
          return 'Loading...';
        }
        if (error) {
          return `Error! Getting systems`;
        }

        return <SystemList systems={data.systems} />;
      }}
    </Query>
  );
};

export default SystemListWithData;
