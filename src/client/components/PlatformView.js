import React ,{Component} from 'react';
import DomainView from './DomainView'
import PropTypes from 'prop-types';
import { Grid, Header, Segment, Container } from 'semantic-ui-react'
import '../../resources/css/Topo.css'

export default class PlatformView extends Component {

    static propTypes = {
        treasureMapData: PropTypes.instanceOf(Object).isRequired
    }

    render() {
        return (
            <Grid columns="equal">
                {
                    this.props.treasureMapData.platforms.map((platform, index) => {
                        return (
                            <Grid columns="equal" key={index}>
                                <Grid.Column>
                                    <Header as='h1' attached='top' className='header platform-header'>
                                        { platform.name } 
                                    </Header>
                                    <Segment padded attached>
                                        <Container>
                                        <DomainView className="platform-domains" domains={ platform.domains }/>
                                        </Container>
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        )})
                }
            </Grid>
        );
    }
}
