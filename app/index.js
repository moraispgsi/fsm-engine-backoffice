import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import routes from './config/routes';

import jquery from 'jquery';
import metismenu from 'metismenu';
import bootstrap from 'bootstrap';
import path from 'path';

import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/font-awesome/css/font-awesome.css'
import './../node_modules/animate.css/animate.min.css'
import './../public/styles/plugins/jsTree/style.css'
import './../public/styles/plugins/sweetalert2/sweetalert2.min.css'
import './../public/styles/style.css'

ReactDOM.render(
<Router history={hashHistory}>{routes}</Router>,
    document.getElementById('root')
);