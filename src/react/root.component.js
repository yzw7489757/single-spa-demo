import React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from '@React/routes/home.jsx';
import About from '@React/routes/about.jsx';
import TodoList from '@React/routes/todoList.jsx';

import '../../assets/styles/public.css';

const history = createBrowserHistory({
  basename: '/react'
})
export default class Root extends React.Component {
  render() {
    return (
      <div>
        <Router
          history={history}
        >
            <nav className="app-nav">
              <ul className="nav-list">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/todoList">Todo List</Link>
                </li>
              </ul>
            </nav>
            <div className="app-box">
              <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/todoList">
                  <TodoList />
                </Route>
                <Route path="/">
                  <Home >
                    <h1 style={{color:'#fff'}}>Current is React-app.</h1>
                  </Home>
                </Route>
              </Switch>
            </div>
        </Router>
      </div>
    );
  }
}

