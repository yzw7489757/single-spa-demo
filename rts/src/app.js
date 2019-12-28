import * as React from "react";
import * as ReactDOM from "react-dom";
import 'assets/styles/index.less'
import App from "./views/app";
import singleSpaReact from 'single-spa-react';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter: () => domElementGetter('react-ts-app')
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
function domElementGetter(id) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    document.body.appendChild(el);
  }
  console.log(el)
  return el;
}