import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import * as serviceWorker from './plugins/serviceWorker';

import './index.css';

import WelcomePage from './components/WelcomePage';
import PostPage from './components/PostPage';

import HomePage from './components/v2/HomePage';

const Index = () => (
  <Router>
    <Route path="/" exact component={WelcomePage} />
    <Route path="/post/:category/:name" exact component={PostPage} />

    <Route path="/v2" exact component={HomePage} />
  </Router>
);

ReactDOM.render(<Index />, document.getElementById('root'));

serviceWorker.unregister();
