import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import { configureStore, history } from '@store/store';

import { Routes } from 'rootRouter';

import 'App.scss';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route component={Routes} />
    </ConnectedRouter>
  </Provider>
);

export default App;
