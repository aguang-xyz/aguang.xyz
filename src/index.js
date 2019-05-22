import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import * as serviceWorker from './plugins/serviceWorker';

import './index.css';

import WelcomePage from './components/WelcomePage';
import HomePage from './components/HomePage';

const Index = () => (
  <Router>
    <Route path="/" exact component={WelcomePage} />
    <Route path="/home" exact component={HomePage} />
  </Router>
);

ReactDOM.render(<Index />, document.getElementById('root'));

serviceWorker.unregister();
