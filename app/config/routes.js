import React from 'react'
import Main from '../components/layouts/Main';
import Blank from '../components/layouts/Blank';


import ViewServer from '../views/server/ViewServer';
import AddServer from '../views/server/AddServer';


import { Route, Router, IndexRedirect, browserHistory} from 'react-router';

export default (
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRedirect to="/server" />
            <Route path="server" component={ViewServer}> </Route>

        </Route>
    </Router>

);