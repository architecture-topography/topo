import '../../resources/css/App.css';

import React, {Component} from 'react';

class MainDisplay extends Component {
    render() {
        return (
            <div className="MainDisplay">
                <h1>Topo Main Display</h1>
                {this.props.treasureMapData.platforms.map((platform, index) => (
                    <div key={index}>
                        <p>{platform.name}</p>
                        {platform.domains.map((domain, index) =>
                            <p key={index}>{JSON.stringify(domain)}</p>
                        )}
                    </div>
                ))}
            </div>
        );
    }
}

export default MainDisplay;
