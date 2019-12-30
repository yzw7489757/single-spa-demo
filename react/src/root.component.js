import React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from '@/routes/home.jsx';
import About from '@/routes/about.jsx';
import TodoList from '@/routes/todoList.jsx';

import styles from './styles/app-nav.css';

const history = createBrowserHistory({
  basename: '/react'
})
export default class Root extends React.Component {

  componentDidCatch (err) {
    console.log(err)
  }
  
  render() {
    return (
        <Router
          history={history}
        >
          <div className="app-container">
            <nav className="app-nav">
              <ul className="nav-list">
                  <Link to="/"><li>Home</li></Link>
                  <Link to="/about"><li>About</li></Link>
                  <Link to="/todoList"> <li>Todo List </li></Link>
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
        </div>
        </Router>
    );
  }
}

