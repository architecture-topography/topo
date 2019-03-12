/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import './resources/css/index.css';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import * as AssetFile from './actions/assetLoader';
import * as ConfigFile from './actions/configLoader';
import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary';
import { register } from './serviceWorker';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_URI,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: httpLink,
});

const pathToConfigFile = process.env.REACT_APP_CONFIG_FILE;
const pathToAssetsFile = process.env.REACT_APP_ASSETS_FILE;

Promise.all([
  ConfigFile.load(pathToConfigFile),
  AssetFile.load(pathToAssetsFile),
])
  .then(([config, assets]) => {
    console.log('process.env', process.env);
    renderDom(
      <ApolloProvider client={client}>
        <App config={config} systems={assets} />
      </ApolloProvider>
    );
    register();
  })
  .catch(error => {
    renderDom(
      <ErrorBoundary message={error.toString()} displayError={true}>
        <p />
      </ErrorBoundary>
    );
    console.error(error);
  });

function renderDom(rootElement: ReactElement<any>) {
  return ReactDOM.render(rootElement, document.getElementById('root'));
}
