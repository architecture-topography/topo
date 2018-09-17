import '../../resources/css/App.css';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FileDrop from './FileDrop';

class App extends Component {
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

    render() {
        return (
            <div className="App">
                <FileDrop />
            </div>
        );
    }
}

export default App;
