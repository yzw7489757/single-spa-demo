import 'zone.js';
import 'reflect-metadata';
import singleSpaAngular from 'single-spa-angular';
import { ApplicationRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import mainModule from './main-module.ts';
import { Router } from '@angular/router';
import {domElementGetter} from './app'

const ngLifecycles = singleSpaAngular({
  domElementGetter: ()=> domElementGetter('angular-app'),
  mainModule,
  angularPlatform: platformBrowserDynamic(),
  template: `<angularApp />`,
  Router, 
  ApplicationRef,
  // NgZone,
})
