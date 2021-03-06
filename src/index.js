import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";

import * as serviceWorker from "./plugins/serviceWorker";

import "./index.css";

import CategoryPage from "./pages/category-page";
import PostPage from "./pages/post-page";
import ProjectPage from "./pages/project-page";

const Index = () => (
  <Router>
    <Route path="/" exact component={CategoryPage} />

    <Route path="/post/:category" exact component={CategoryPage} />

    <Route path="/post/:category/:name" exact component={PostPage} />

    <Route path="/projects" exact component={ProjectPage} />
  </Router>
);

ReactDOM.render(<Index />, document.getElementById("root"));

serviceWorker.unregister();
