import React ,{Component} from 'react';
import DomainView from './DomainView'
import PropTypes from 'prop-types';
import { Grid, Header, Segment } from 'semantic-ui-react'

export default class PlatformView extends Component {

    static propTypes = {
        platforms: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            domains: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired
        }))
    }

    render(){
        const { platforms } = this.props
        
        return (
            <Grid columns="equal">
                {
                    platforms.map((platform, index) => {
                        return (
                            <Grid.Column key={ index }>
                                <Segment inverted color="green" secondary>
                                    <Header className="platform-name">{ platform.name }</Header>
                                    <DomainView className="platform-domains" domains={ platform.domains }/>
                                </Segment>
                            </Grid.Column>
                        )})
                }
            </Grid>
        );
    }
}
