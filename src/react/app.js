import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Root from './root.component.js';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  domElementGetter: () => document.getElementById('react-app')
});

export function bootstrap(props) {
  console.log('react-app is bootstrap')
  return reactLifecycles.bootstrap(props);
}

export function mount(props) {
  console.log('react-app is Mounted')
  return reactLifecycles.mount(props);
}

export function unmount(props) {
  console.log('react-app is unMounted')
  return reactLifecycles.unmount(props);
}
