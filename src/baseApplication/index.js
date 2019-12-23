import {
  getMountedApps,
  registerApplication,
  start,
  navigateToUrl
} from 'single-spa';

registerApplication('react', () => import('../react/app.js'), pathPrefix('/react'));
registerApplication('vue', () => import('../vue/app.js'), pathPrefix('/vue'));
registerApplication('angular', () => import('../angular/app.js'), pathPrefix('/angular'));
registerApplication('svelte', () => import('../svelte/app.js'), pathPrefix('/svelte'));

setDefaultMountedApp('/react');

start();


function setDefaultMountedApp(path) {
  window.addEventListener(`single-spa:no-app-change`, () => {
    const activedApps = getMountedApps()
    if (activedApps.length === 0) {
      navigateToUrl(path)
    }
  }, {
    once: true
  })
}

function pathPrefix(prefix) {
  return function (location) {
    return location.pathname.startsWith(`${prefix}`);
  }
}