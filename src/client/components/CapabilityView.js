import React ,{Component} from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Segment } from 'semantic-ui-react'
import '../../resources/css/Topo.css'

export default class CapabilityView extends Component {

    static propTypes = {
        capabilities: PropTypes.instanceOf(Object).isRequired,
        capabilityId: PropTypes.string.isRequired
    }

    render() {
        const { capabilities, capabilityId } = this.props
        const capability = capabilities[capabilityId];
        
        return (
            <Grid columns="equal">
              <Grid.Column>
                <Segment className="capability-name-title">
                  <Header>{ capability.name }</Header>
                </Segment>

                {
                  capability.systems.map((system, index) => {
                    return <Segment key={ index } inverted color="blue" tertiary className="domain-cap" content={system.name} />
                  })
                }
              </Grid.Column>
            </Grid>
          )
    }
}
