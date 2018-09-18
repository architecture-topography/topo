import React ,{Component} from 'react';
import DomainView from './DomainView';
import PropTypes from 'prop-types';
import { Container, Segment } from 'semantic-ui-react'

export default class PlatformView extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        domains: PropTypes.arrayOf(DomainView).isRequired
    }

    render(){
        const { name, domains } = this.props
        return (
            <Container>
                <Segment className="platform-name" inverted color="green">{ name }</Segment>
                <DomainView className="platform-domains" domains={domains}/>
            </Container>                 
        )
    }
}
