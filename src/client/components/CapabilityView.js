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

 import React ,{Component} from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Popup, List, Card, Segment } from 'semantic-ui-react'
import '../../resources/css/Topo.css'

export default class CapabilityView extends Component {

    static propTypes = {
        treasureMapData: PropTypes.instanceOf(Object).isRequired,
        capabilityId: PropTypes.string.isRequired
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
                        return capability
                    }
                }
            }
        }

        return null
    }

    render() {
      const capability = this.getCapabilityFromId();

      if (!capability) {
        return (
          <Grid columns="equal">
            <Grid.Column>
            <Header as='h1' className='capability-name-title'>Capability missing...</Header>
            </Grid.Column>
          </Grid>
        )
      }

      return (
        <Grid columns="equal">
          <Grid.Row>
          <div className="ui large breadcrumb">
            <a className="home-section" href="/">Home</a>
            <i className="right chevron icon divider"></i>
            <a className="section"> {capability.platformName} </a>
            <i className="right chevron icon divider"></i>
            <a className="section"> {capability.domain.name} </a>
            <i className="right chevron icon divider"></i>
            <div className="active section"> {capability.name} </div>
           </div>
           </Grid.Row>
           <Grid.Column>
          <Header as='h1' attached='top' className='header capability-view-header'>
            { capability.name } 
            <Header.Subheader>{capability.domain.name}</Header.Subheader>
          </Header>
          <Segment padded attached>
            <Card.Group itemsPerRow={3}>
              { this.getSystems(capability) }
            </Card.Group>
          </Segment>
          </Grid.Column>
        </Grid>
      )
    }

    getSystems(capability) {
      let systems = '';
      if (capability.systems) {
          systems = capability.systems.map((system, index) => {
              return (
                  <Popup
                    trigger={
                      <Card className='system-card'>
                        <Card.Content style={{"backgroundColor": capability.domain.color}} className='system-card-header' header={system.name} />
                        <Card.Content className='system-card-desc' style={(!system.description || !system.description.length ? {"fontStyle":"italic"} : {})}>
                          {(!system.description || !system.description.length ? "No system description" : system.description)}
                        </Card.Content>
                      </Card>
                    }
                    key={ index }
                    size='small'
                    position='right center'
                  >
                    <Popup.Content className='system-tech-stack'>
                      <Header as='h3'>Primary technologies</Header>
                      {this.getListOfSystemAttribute(system, 'primary-technologies')}
                      <Header as='h3'>Infrastructure</Header>
                      {this.getListOfSystemAttribute(system, 'infrastructure')}
                      <Header className={'other-capabilities'} as='h3'>Other Capabilities</Header>
                      {this.getListOfOtherCapabilities(system, capability)}
                    </Popup.Content>
                  </Popup>
              )
          })
      }
      return systems;
    }

    getListOfOtherCapabilities(system, expandedCapability) {
      let otherCapabilities = system.capabilities.filter((capability) => capability !== expandedCapability.name)
      if (otherCapabilities.length <= 1) return <span id="no-capabilities-text">None</span>
      return this.getListOfSystemAttribute(system, 'capabilities', otherCapabilities);
    }

    getListOfSystemAttribute(system, attribute, optionalAttributeList) {

      let attributeListUnfiltered = (optionalAttributeList && optionalAttributeList.length ? optionalAttributeList : system[attribute]);
      
      let attributeList;
      if (attributeListUnfiltered && attributeListUnfiltered.length) attributeList = attributeListUnfiltered.filter(element => element);

      if (attributeList && attributeList.length) {
        return (
          <List as='ul'>
            {attributeList.map((val, index) => {
              return <List.Item key={ index } as='li'>{ val }</List.Item>
            })}
          </List>
        )
      } else {
        return <span id={attribute + "-none"}>None</span>
      }
    }
}
