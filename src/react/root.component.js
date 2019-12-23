import React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

import './index.css';

const history = createBrowserHistory({
  basename: '/react'
})

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <h1>Current is React-app.</h1>
        <Router
          history={history}
        >
          <div className="react-layout">
            <nav className="react-app-nav">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
              </ul>
            </nav>
            <div className="react-app-view">
              <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/users">
                  <Users />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

