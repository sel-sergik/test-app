import { createStore, Store, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createBrowserHistory, History } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { AppState } from './types/app-state';
import createRootReducer from './root-reducer';

export const history: History = createBrowserHistory();

export const configureStore = (): Store<AppState> => {
  const middlewares: Array<Middleware> = [routerMiddleware(history), thunk];
  const enchancers = composeWithDevTools(applyMiddleware(...middlewares));
  const store: any = createStore(createRootReducer(history), undefined, enchancers);

  return store;
};
