import React ,{Component} from 'react';
import DomainView from './DomainView'
import PropTypes from 'prop-types';
import { Grid, Header, Segment } from 'semantic-ui-react'
import '../../resources/css/Topo.css'

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
                              <Segment className="platform-name-title">
                               <Header>{ platform.name }</Header>
                              </Segment>
                              <DomainView className="platform-domains" domains={ platform.domains }/>
                            </Grid.Column>
                        )})
                }
            </Grid>
        );
    }
}
