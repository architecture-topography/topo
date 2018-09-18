import React ,{Component} from 'react';
import DomainView from './DomainView';
import PropTypes from 'prop-types';
import { Container, Segment } from 'semantic-ui-react'

export default class PlatformView extends Component {

    static propTypes = {
        platforms: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            domains: PropTypes.arrayOf(DomainView).isRequired
        }))
    }

    render(){
        const { platforms } = this.props
        return platforms.map(platform => {
                    return (<Container>
                        <Segment className="platform-name" inverted color="green">{ platform.name }</Segment>
                        <DomainView className="platform-domains" domains={ platform.domains }/>
                    </Container>)
                });
    }
}
