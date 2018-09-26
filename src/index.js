import './resources/css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/components/App';
import registerServiceWorker from './client/registerServiceWorker';
import {getResource} from './client/actions/resourceLoaderApi';
import ErrorBoundary from './client/components/ErrorBoundary';

const pathToConfigFile = process.env.REACT_APP_CONFIG_FILE;
const pathToAssetsFile = process.env.REACT_APP_ASSETS_FILE;

Promise
    .all([getResource(pathToConfigFile), getResource(pathToAssetsFile)])
    .then(([config, assets]) => {
        renderDom(<App config={config} systems={assets}/>);
        registerServiceWorker();
    })
    .catch(error => {
        renderDom(<ErrorBoundary message={error.toString()} displayError={true}><p/></ErrorBoundary>);
        console.error(error);
    });

function renderDom(rootElement) {
    return ReactDOM.render(rootElement, document.getElementById('root'));
}
