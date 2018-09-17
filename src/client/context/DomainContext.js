import React from 'react';
import PropTypes from 'prop-types';

export const DomainContext = React.createContext();

class DomainProvider extends React.Component {
    static propTypes = {
        config: PropTypes.shape({
            Platforms: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string.isRequired,
                domains: PropTypes.arrayOf(PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    description: PropTypes.string.isRequired,
                    capabilities: PropTypes.arrayOf(PropTypes.shape({
                        name: PropTypes.string.isRequired,
                        order: PropTypes.number
                    }))
                }))
            })),
            Others: PropTypes.array
        })
    };

    constructor(props) {
        super(props);

        this.state = {
            configMapping: this.props.config,
            systemMapping: [],
            updateSystemMapping: this._updateSystemMapping
        };
    }

    _updateSystemMapping = (systemMapping) => {
        this.setState({systemMapping});
    };

    render() {
        return (
            <DomainContext.Provider value={this.state}>
                {this.props.children}
            </DomainContext.Provider>
        );
    }
}

export default DomainProvider;
