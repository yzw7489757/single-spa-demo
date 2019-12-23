import * as singleSpa from 'single-spa';

singleSpa.registerApplication('react', () => import ('../react/app.js'), pathPrefix('/react'));
singleSpa.registerApplication('vue', () => import ('../vue/app.js'), pathPrefix('/vue'));
singleSpa.registerApplication('angular', () => import ('../angular/app.js'), pathPrefix('/angular'));

singleSpa.start();

function pathPrefix(prefix) {
  return function(location) {
    return location.pathname.startsWith(`${prefix}`);
  }
}