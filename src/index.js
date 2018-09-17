import './resources/css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/components/App';
import {ConfigMappingContext} from './client/context/ConfigMappingContext';
import registerServiceWorker from './client/registerServiceWorker';

function AppWithContext(props) {
    return (
        <ConfigMappingContext.Consumer>
            {context => <App {...props} config={context} />}
        </ConfigMappingContext.Consumer>
    );
}

ReactDOM.render(<AppWithContext />, document.getElementById('root'));
registerServiceWorker();
