import React ,{Component} from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Segment, Divider, Container } from 'semantic-ui-react'
import '../../resources/css/Topo.css'

export default class CapabilityView extends Component {

    static propTypes = {
        treasureMapData: PropTypes.instanceOf(Object).isRequired,
        capabilityId: PropTypes.string.isRequired
    }

    render() {
        const capabilities = this.props.treasureMapData.capabilities;
        const capabilityId = this.props.capabilityId;

        const capability = capabilities[capabilityId];

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
              {
                capability.systems.map((system, index) => {
                  return (
                  <Segment key={ index } inverted color="blue" tertiary className="domain-cap">
                    <Header as='h3'>{system.name}</Header>
                    {this.otherCapabilities(system.capabilities)}
                  </Segment>
                )})
              }
            </Grid.Column>
          </Grid>
        )
    }

    otherCapabilities(capabilities) {
      if (capabilities && capabilities.length) {
        return (
          <Container>
          <Divider/>
          <p>
            Other capabilities: {capabilities.join(", ")}
          </p>
          </Container>
        )
      }
    }
}
