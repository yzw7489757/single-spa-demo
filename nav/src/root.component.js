import React from 'react';
import {navigateToUrl,start} from 'single-spa'
import { Layout, Menu,  } from 'antd';

const { Header } = Layout;

export default class Root extends React.Component {
  constructor() {
    super()
    this.routeList = [
      { title: 'React App', path: '/react' },
      { title: 'Vue App', path: '/vue' },
      { title: 'Svelte App', path: '/svelte' },
      { title: 'reactTs App', path: '/rts' },
      { title: 'craTs App', path: '/crats' },
    ]
  }
  componentDidMount(){
    start()
  }
  componentDidCatch(err) {
    console.log(err)
  }

  generatorRoute = (route) => {
    return (
      <Menu.Item  key={route.path} onClick={() => navigateToUrl(route.path)}>{route.title}</Menu.Item>
    )
  }
  render() {
    return (
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
        >
            {this.routeList.map(this.generatorRoute)}
        </Menu>
      </Header>
    );
  }
}

