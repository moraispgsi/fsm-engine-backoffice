import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import App, { reducer } from './AppContainer';
import AppDefault from './AppDefault';
import Home from './Home';

// servers
import ViewServer from './pages/server/ViewServer';
import AddServer from './pages/server/AddServer';

// dispatcher
import ViewDispatcher from './pages/dispatcher/ViewDispatcher';
import AddDispatcher from './pages/dispatcher/AddDispatcher';
import EditDispatcher from './pages/dispatcher/EditDispatcher';
import DispatcherDocumentation from './pages/dispatcher/documentation/DispatcherDocumentation';

// versions
import EditModel from './pages/version/EditModel';
import ViewVersion from './pages/version/ViewVersion';

// instances
import ViewInstance from './pages/instance/ViewInstance';
import ViewInstanceState from './pages/instance/ViewInstanceState';

// Login
import Login from './pages/login/Login';
import Register from './pages/login/Register';
import Lockscreen from './pages/login/Lockscreen';

// Make allowances for gh-pages routing
// main path is project name
let mainPath = '/';
if (GH_PAGES) { // eslint-disable-line no-undef
  mainPath = NAME; // eslint-disable-line no-undef
}

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    app: reducer,
    routing: routerReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

const routes = [
  <Route path={mainPath} component={App}>
    <IndexRoute component={Home} />
  </Route>,
  <Route path={`${mainPath}server/add`} component={App}>
    <IndexRoute component={AddServer} />
  </Route>,
  <Route path={`${mainPath}server`} component={App}>
    <IndexRoute component={ViewServer} />
  </Route>,
  <Route path={`${mainPath}dispatcher/add`} component={App}>
    <IndexRoute component={AddDispatcher} />
  </Route>,
  <Route path={`${mainPath}dispatcher/edit`} component={App}>
    <IndexRoute component={EditDispatcher} />
  </Route>,
  <Route path={`${mainPath}dispatcher`} component={App}>
    <IndexRoute component={ViewDispatcher} />
  </Route>,
  <Route path={`${mainPath}dispatcher/documentation`} component={App}>
    <IndexRoute component={DispatcherDocumentation} />
  </Route>,
  <Route path={`${mainPath}version/model`} component={App}>
    <IndexRoute component={EditModel} />
  </Route>,
  <Route path={`${mainPath}version`} component={App}>
    <IndexRoute component={ViewVersion} />
  </Route>,
  <Route path={`${mainPath}instance`} component={App}>
    <IndexRoute component={ViewInstance} />
  </Route>,
  <Route path={`${mainPath}instance/state`} component={App}>
    <IndexRoute component={ViewInstanceState} />
  </Route>,
  <Route path={`${mainPath}login`} component={AppDefault}>
    <IndexRoute component={Login} />
  </Route>,
  <Route path={`${mainPath}register`} component={AppDefault}>
    <IndexRoute component={Register} />
  </Route>,
  <Route path={`${mainPath}lockscreen`} component={AppDefault}>
    <IndexRoute component={Lockscreen} />
  </Route>,
];

// set app div height
document.getElementById('app').style['min-height'] = '100vh';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app') // eslint-disable-line comma-dangle
);
