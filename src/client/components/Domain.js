import React, { Component } from 'react';


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
            <div>
                <span className="domain-name"> { name } </span>
                <span className="domain-desc"> { description } </span>
                {
                    orderedCapabilities.map(capability => {
                        return <span key={ capability.order } className="domain-cap">{ capability.name }</span>
                    })
                }
            </div>
        )
    }
}
