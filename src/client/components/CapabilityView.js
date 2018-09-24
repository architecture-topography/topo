import React ,{Component} from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Segment, Divider, Container, Label, Popup, List } from 'semantic-ui-react'
import '../../resources/css/Topo.css'

export default class CapabilityView extends Component {

    static propTypes = {
        treasureMapData: PropTypes.instanceOf(Object).isRequired,
        capabilityId: PropTypes.string.isRequired
    }

    getListOfSystemAttribute(system, attribute) {
      if (system[attribute] && system[attribute].length > 0) {
        return (
          <List as='ul'>
            {system[attribute].map((val, index) => {
              return <List.Item key={ index } as='li'>{ val }</List.Item>
            })}
          </List>
        )
      } else {
        return "None"
      }
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

        let systems = '';
        if (capability.systems) {
            systems = capability.systems.map((system, index) => {
                return (
                  <Popup
                    trigger={
                      <Segment inverted color="blue" tertiary className="domain-cap">
                        <Header as='h3'>{system.name}</Header>
                        {this.otherCapabilities(system.capabilities)}
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
                    </Popup.Content>
                  </Popup>
                  
                )
            })
        }

        return (
          <Grid columns="equal">
            <Grid.Column>
              <Segment className="capability-name-title">
                <Header>{ capability.name }</Header>
              </Segment>
              { systems }
            </Grid.Column>
          </Grid>
        )
    }

    otherCapabilities(capabilities) {
      if (capabilities && capabilities.length) {
        const capabilityOnView = this.getCapabilityFromId();
        const capabilitiesWithoutCapabilityOnView = capabilities.filter((capability) => {
          return capability !== capabilityOnView.name;
        });
  
        if (capabilitiesWithoutCapabilityOnView && capabilitiesWithoutCapabilityOnView.length) {
          return (
            <Container id='other-capabilities'>
            <Divider/>
            <span>Other capabilities: </span>
            {capabilitiesWithoutCapabilityOnView.map((capability, index) => {
              return (
                <Label key={index} size='small'>{capability}</Label>
                );
            })}
            </Container>
          )
        }  
      }
    }
}
