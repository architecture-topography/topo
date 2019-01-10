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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Header,
  List,
  Card,
  Segment,
  Accordion,
  Icon,
} from 'semantic-ui-react';
import '../resources/css/Topo.css';

export default class CapabilityView extends Component {
  state = { activeIndex: [] };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex =
      { activeIndex }.activeIndex.indexOf(index) !== -1 ? -1 : index;
    let newArray = { activeIndex }.activeIndex;
    if (newIndex !== -1) {
      newArray.push(newIndex);
    } else {
      newArray.splice(newArray.indexOf(index), 1);
    }
    this.setState({ activeIndex: newArray });
  };

  static propTypes = {
    treasureMapData: PropTypes.instanceOf(Object).isRequired,
    capabilityId: PropTypes.string.isRequired,
  };

  getListOfAllCapabilities() {
    let platform;
    let domain;
    let capability;
    let capabilityList = [];

    for (let i = 0; i < this.props.treasureMapData.platforms.length; i++) {
      platform = this.props.treasureMapData.platforms[i];
      for (let j = 0; j < platform.domains.length; j++) {
        domain = platform.domains[j];
        for (let k = 0; k < domain.capabilities.length; k++) {
          capability = domain.capabilities[k];
          capabilityList.push(capability);
        }
      }
    }
    // sort capability list by capability id
    capabilityList.sort((a, b) => {
      if (a.id < b.id) return -1;
      else if (a.id > b.id) return 1;
      return 0;
    });

    return capabilityList;
  }

  getCapabilityFromId() {
    let platform;
    let domain;
    let capability;

    for (let i = 0; i < this.props.treasureMapData.platforms.length; i++) {
      platform = this.props.treasureMapData.platforms[i];
      for (let j = 0; j < platform.domains.length; j++) {
        domain = platform.domains[j];

        for (let k = 0; k < domain.capabilities.length; k++) {
          capability = domain.capabilities[k];
          if (capability.id === this.props.capabilityId) {
            capability.domain = domain;
            capability.platformName = platform.name;
            return capability;
          }
        }
      }
    }

    return null;
  }

  render() {
    const capability = this.getCapabilityFromId();

    if (!capability) {
      return (
        <Grid columns="equal">
          <Grid.Column>
            <Header as="h1" className="capability-name-title">
              Capability missing...
            </Header>
          </Grid.Column>
        </Grid>
      );
    }

    return (
      <Grid columns="equal">
        <Grid.Row>
          <div className="ui large breadcrumb">
            <a className="home-section" href="/">
              Home
            </a>
            <i className="right chevron icon divider" />
            <a className="section"> {capability.platformName} </a>
            <i className="right chevron icon divider" />
            <a className="section"> {capability.domain.name} </a>
            <i className="right chevron icon divider" />
            <div className="active section"> {capability.name} </div>
          </div>
        </Grid.Row>

        <Grid.Column>
          <Header
            as="h1"
            attached="top"
            className="header capability-view-header"
          >
            {capability.name}
            <Header.Subheader>{capability.domain.name}</Header.Subheader>
          </Header>
          <Segment padded attached>
            <Card.Group itemsPerRow={3}>
              {this.getSystems(capability)}
            </Card.Group>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }

  getSystems(capability) {
    const { activeIndex } = this.state;
    let systems = '';
    if (capability.systems) {
      systems = capability.systems.map((system, index) => {
        return (
          <Card className="system-card">
            <Accordion>
              <Accordion.Title
                active={activeIndex.indexOf(index) !== -1}
                index={index}
                onClick={this.handleClick}
              >
                <Card.Content
                  style={{
                    backgroundColor: capability.domain.color,
                  }}
                  className="system-card-header"
                  header={system.name}
                />

                <Card.Content
                  className="system-card-desc"
                  style={
                    !system.description || !system.description.length
                      ? { fontStyle: 'italic' }
                      : {}
                  }
                >
                  {!system.description || !system.description.length
                    ? 'No system description'
                    : system.description}
                </Card.Content>
                <Card.Content className="system-card-icon">
                  <Icon
                    name={
                      activeIndex.indexOf(index) !== -1
                        ? 'chevron up'
                        : 'chevron down'
                    }
                  />
                </Card.Content>
              </Accordion.Title>

              <Accordion.Content active={activeIndex.indexOf(index) !== -1}>
                <Card.Content className="system-card-extra">
                  <Header className={'primary-technologies'} as="h3">
                    Primary technologies
                  </Header>
                  {this.getListOfSystemAttribute(
                    system,
                    'primary-technologies'
                  )}

                  <Header className={'infrastructure'} as="h3">
                    Infrastructure
                  </Header>
                  {this.getListOfSystemAttribute(system, 'infrastructure')}

                  <Header className={'other-capabilities'} as="h3">
                    Other Capabilities
                  </Header>
                  {this.getListOfOtherCapabilities(system, capability)}
                </Card.Content>
              </Accordion.Content>
            </Accordion>
          </Card>
        );
      });
    }
    return systems;
  }

  getListOfOtherCapabilities(system, expandedCapability) {
    let otherCapabilities = system.capabilities.filter(
      capability => capability !== expandedCapability.name
    );

    if (otherCapabilities.length <= 1)
      return <span id="no-capabilities-text">None</span>;
    return this.getListOfSystemAttribute(
      system,
      'capabilities',
      otherCapabilities
    );
  }

  getListOfSystemAttribute(system, attribute, optionalAttributeList) {
    let attributeListUnfiltered =
      optionalAttributeList && optionalAttributeList.length
        ? optionalAttributeList
        : system[attribute];

    let attributeList;
    if (attributeListUnfiltered && attributeListUnfiltered.length)
      attributeList = attributeListUnfiltered.filter(element => element);

    let capabilityList = this.getListOfAllCapabilities();

    if (attributeList && attributeList.length) {
      return (
        <List as="ul" bulleted>
          {attributeList.map((val, index) => {
            let capabilityId = 0;
            if (attribute === 'capabilities') {
              let capabilityFromList = capabilityList.find(
                obj => obj.name == val
              );
              capabilityId = capabilityFromList ? capabilityFromList.id : 0; // 0 means capability view not rendered for it
            }
            let linkPath =
              attribute === 'capabilities'
                ? '/#/capability/' + capabilityId
                : '';
            return (
              <List.Item key={index} href={linkPath}>
                {val}
              </List.Item>
            );
          })}
        </List>
      );
    } else {
      return <span id={attribute + '-none'}>None</span>;
    }
  }
}
