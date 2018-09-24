import React ,{Component} from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Segment, Divider, Container, Label } from 'semantic-ui-react'
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

        let systems = '';
        if (capability.systems) {
            systems = capability.systems.map((system, index) => {
                return (
                  <Segment key={ index } inverted color="blue" tertiary className="domain-cap">
                    <Header as='h3'>{system.name}</Header>
                    {this.otherCapabilities(system.capabilities)}
                  </Segment>
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
        return (
          <Container>
          <Divider/>
          <span>Other capabilities: </span>
          {capabilities.map((capability, index) => {
            return (
              <Label key={index} size='small'>{capability}</Label>
              );
          })}
          </Container>
        )
      }
    }
}
