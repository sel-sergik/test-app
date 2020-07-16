import { createStore, Store, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createBrowserHistory, History } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

// eslint-disable-next-line import/no-cycle
import { AppState } from '@store/types/appState';

import createRootReducer from '@store/rootReducer';

export const history: History = createBrowserHistory();

export const configureStore = (): Store<AppState> => {
  const middlewares: Array<Middleware> = [routerMiddleware(history), thunk];
  const enchancers = composeWithDevTools(applyMiddleware(...middlewares));
  const store: Store = createStore(
    createRootReducer(history),
    undefined,
    enchancers
  );

  return store;
};
