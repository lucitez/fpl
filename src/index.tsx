import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { Configuration } from 'react-md';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import Layout from './navigation';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Configuration>
          <Layout />
        </Configuration>
      </QueryParamProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
