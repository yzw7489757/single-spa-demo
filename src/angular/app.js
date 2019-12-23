import 'zone.js';
import 'reflect-metadata';
import singleSpaAngular from 'single-spa-angular';
import { ApplicationRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import mainModule from './main-module.ts';
import { Router } from '@angular/router';

const ngLifecycles = singleSpaAngular({
  domElementGetter:()=>document.getElementById('angular-app'),
  mainModule,
  angularPlatform: platformBrowserDynamic(),
  template: `<angularApp />`,
  Router,
  ApplicationRef,
})

export function bootstrap(props) {
  console.log('angular-app is bootstrap')
  return ngLifecycles.bootstrap(props);
}

export function mount(props) {
  console.log('angular-app is Mounted')
  return ngLifecycles.mount(props).then(val => {});
}

export function unmount(props) {
  console.log('angular-app is unMounted')
  return ngLifecycles.unmount(props);
}
