import '../../resources/css/App.css';

import React, {Component} from 'react';

class MainDisplay extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="MainDisplay">
                <h1>Treasure Map Main Display</h1>
                <p>{JSON.stringify(this.props.treasureMapData)}</p>
            </div>
        );
    }
}

export default MainDisplay;
