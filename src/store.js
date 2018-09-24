import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import rootReducer from './rootReducer';
export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

const initialState = {};
const enhancers = []; 
const middleware = [promise(), thunk, routerMiddleware(history)];
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}
const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export default createStore(connectRouter(history)(rootReducer), initialState, composedEnhancers);
