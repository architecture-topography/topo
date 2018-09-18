import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react'

export default class Domain extends Component {

    constructor(props){
        super(props);
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
