import React ,{Component} from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Segment, Popup, List } from 'semantic-ui-react'
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
              <Segment className="capability-name-title capability-missing">
                <Header>Capability missing</Header>
              </Segment>
            </Grid.Column>
          </Grid>
        )
      }

      return (
        <Grid columns="equal">
          <Grid.Column>
            <Segment className="capability-name-title">
              <Header>{ capability.name }</Header>
            </Segment>
            { this.getSystems(capability) }
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
                    <Segment inverted color="blue" tertiary className="domain-cap">
                      <Header as='h3'>{system.name}</Header>
                    </Segment>
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
      if (otherCapabilities.length <= 1) return <span id="no-capabilities-text" style={{"fontStyle": "italic"}}>No other capabilities</span>;
      return this.getListOfSystemAttribute(system, 'capabilities', otherCapabilities);
    }

    getListOfSystemAttribute(system, attribute, optionalAttributeList) {

      let attributeList = (optionalAttributeList && optionalAttributeList.length ? optionalAttributeList : system[attribute]);

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
