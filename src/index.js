import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import * as serviceWorker from './plugins/serviceWorker';

import './index.css';

import WelcomePage from './components/WelcomePage';
import PostPage from './components/PostPage';

const Index = () => (
  <Router>
    <Route path="/" exact component={WelcomePage} />
    <Route path="/post/:category/:name" exact component={PostPage} />
  </Router>
);

ReactDOM.render(<Index />, document.getElementById('root'));

serviceWorker.unregister();
