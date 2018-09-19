import React ,{Component} from 'react';
import DomainView from './DomainView';
import PropTypes from 'prop-types';
import { Header, Segment } from 'semantic-ui-react'

export default class PlatformView extends Component {

    static propTypes = {
        platforms: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            domains: PropTypes.arrayOf(DomainView).isRequired
        }))
    }

    render(){
        const { platforms } = this.props
        return platforms.map((platform, index) => {
            return (
                <Segment key={ index } inverted color="green" secondary>
                    <Header className="platform-name">{ platform.name }</Header>
                    <DomainView className="platform-domains" domains={ platform.domains }/>
                </Segment>
        )});
    }
}
