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
