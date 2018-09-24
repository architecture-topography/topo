import '../../resources/css/App.css';

import React, {Component} from 'react';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../../resources/css/Topo.css'
import topo_logo from '../../resources/img/Topo-02.png'

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <Image src={ topo_logo } size='small' className='topo-logo' as={Link} to='/' wrapped spaced />
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
