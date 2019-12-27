import React from 'react';
import * as singlespa from 'single-spa'
import './nav.css';

export default class Root extends React.Component {
  constructor() {
    super()
    this.routeList = [
      { title: 'React App', path: '/react' },
      { title: 'Vue App', path: '/vue' },
      { title: 'Svelte App', path: '/svelte' },
      { title: 'Angular App', path: '/angular' },
    ]
  }
  componentDidCatch(err) {
    console.log(err)
  }

  generatorRoute = (route) => {
    return (
      <a key={route.path} onClick={() => singlespa.navigateToUrl(route.path)}>
        <li>{route.title}</li>
      </a>
    )
  }
  render() {
    return (
      <nav className="navbar">
        <ul>
          {this.routeList.map(this.generatorRoute)}
        </ul>
      </nav>
    );
  }
}

