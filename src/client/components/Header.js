import '../../resources/css/App.css';

import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <h1>Topo</h1>
                <p />
            </div>
        );
    }
}

/*                {this.props.treasureMapData.platforms.map((platform, index) => (
                    <div key={index}>
                        <p>{platform.name}</p>
                        {platform.domains.map((domain, index) =>
                            <p key={index}>{JSON.stringify(domain)}</p>
                        )}
                    </div>
                ))}*/

export default Header;
