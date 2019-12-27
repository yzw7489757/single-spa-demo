import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Root from './root.component.js';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  domElementGetter: () => domElementGetter('react-app')
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

/**
 * 全局方法，统一获取挂载 DOM Getters
 *
 * @returns element mount DOM
 */
export function domElementGetter(id) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    document.body.appendChild(el);
  }
  return el;
}