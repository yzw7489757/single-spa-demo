import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import singleSpaReact from 'single-spa-react';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter: () => domElementGetter('cra-ts-app')
});

export function bootstrap(props:any) {
  console.log('react-app is bootstrap')
  return reactLifecycles.bootstrap(props);
}

export function mount(props:any) {
  console.log('react-app is Mounted')
  return reactLifecycles.mount(props);
}

export function unmount(props:any) {
  console.log('react-app is unMounted')
  return reactLifecycles.unmount(props);
}

/**
 * 全局方法，统一获取挂载 DOM Getters
 *
 * @returns element mount DOM
 */
function domElementGetter(id :string) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    document.body.appendChild(el);
  }
  return el;
}

// ReactDOM.render(
//   <App />,
//   domElementGetter('cra-ts') as HTMLElement
// );

registerServiceWorker();
