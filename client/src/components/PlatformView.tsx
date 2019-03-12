/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { TreasureMapData } from '../domain/treasureMap';
import '../resources/css/Topo.css';
import DomainView from './DomainView';

interface IProps {
  treasureMapData: TreasureMapData;
}

export default class PlatformView extends Component<IProps> {
  render() {
    return (
      <div>
        {this.props.treasureMapData.platforms.map((platform, index) => {
          return (
            <Grid columns="1" key={index}>
              <Grid.Column>
                <Header
                  as="h1"
                  attached="top"
                  className="header platform-header"
                >
                  {platform.name}
                </Header>
                <Segment padded attached>
                  <DomainView
                    className="platform-domains"
                    domains={platform.domains}
                  />
                </Segment>
              </Grid.Column>
            </Grid>
          );
        })}
      </div>
    );
  }
}
