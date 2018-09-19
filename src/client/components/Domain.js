import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import '../../resources/css/Topo.css';
import Capability from './Capability';

export default class Domain extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        capabilities: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            order: PropTypes.number.isRequired
        }))
    }

    render() {
        const { name, description, capabilities } = this.props;
        const color = "blue"
        let orderedCapabilities = capabilities.sort((a, b) => {
            return a.order > b.order
        })
        return (
            <Container>
                <Segment inverted color={ color }>
                    <span className="domain-name">{ name }</span> <br/>
                    <span className="domain-desc">"{ description }"</span>
                </Segment>
                
                {
                    orderedCapabilities.map(capability => {
                        return (<Capability key={ capability.order } {...capability} />)
                    })
                }
            </Container>
        )
    }
}
