import './resources/css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/components/App';
import DomainProvider from './client/context/DomainContext';
import registerServiceWorker from './client/registerServiceWorker';

const mappingConfig = JSON.parse(process.CONFIG_FILE_MAPPING);

function AppWithContext(props) {
    return (
        <DomainProvider config={mappingConfig}>
            <App {...props} config={mappingConfig} />
        </DomainProvider>
    );
}

ReactDOM.render(<AppWithContext />, document.getElementById('root'));
registerServiceWorker();
