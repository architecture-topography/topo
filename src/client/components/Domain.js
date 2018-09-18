import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types';

export default class Domain extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        capabilities: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            order: PropTypes.number
        }))
    }

    render() {
        const {name, description, capabilities } = this.props;
        let orderedCapabilities = capabilities.sort((a, b) => {
            return a.order > b.order
        })
        return (
            <Container>
                <Segment inverted color='blue'>
                    <span className="domain-name"> { name } </span>
                    <span className="domain-desc"> { description } </span>
                </Segment>
                
                {
                    orderedCapabilities.map(capability => {
                        return <Segment key={ capability.order } className="domain-cap" content={capability.name}/>
                    })
                }
            </Container>
        )
    }
}
