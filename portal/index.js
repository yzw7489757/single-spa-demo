import {
  getMountedApps,
  registerApplication,
  start,
  navigateToUrl,
  getAppNames
} from 'single-spa';
import SystemJS from 'systemjs/dist/system'
// import 'normalize.css';

const apps = [
  { name: 'nav', url: true, entry: '//localhost:5005/app.js', customProps: {} },
  { name: 'react', url: '/react', entry: '//localhost:5001/app.js', customProps: {} },
  { name: 'vue', url: '/vue', entry: '//localhost:5002/app.js', customProps: {} },
  { name: 'svelte', url: '/svelte', entry: '//localhost:5003/app.js', customProps: {} },
  { name: 'react-ts', url: '/rts', entry: '//localhost:5006/app.js', customProps: {} },
  { name: 'cra-ts', url: '/crats', entry: '//localhost:5007/app.js', customProps: {} },
]

async function registerAllApps() {
  // registerApplication('nav', () => SystemJS.import('/nav-app/app.js'), pathPrefix(true), {});
  // registerApplication('react', () => SystemJS.import('/react-app/app.js'), pathPrefix('/react'), {});
  // registerApplication('vue', () => SystemJS.import('/vue-app/app.js'), pathPrefix('vue'), {});
  // registerApplication('svelte', () => SystemJS.import('/svelte-app/app.js'), pathPrefix('/svelte'), {});
  // registerApplication('react-ts', () => SystemJS.import('/rts/app.js'), pathPrefix('/rts'), {});
  await Promise.all(apps.map(registerApp))

  await setDefaultMountedApp('/react');

  start();
}

registerAllApps();

function setDefaultMountedApp(path) {
  window.addEventListener(`single-spa:no-app-change`, (evt) => {
    
    const activedApps = getMountedApps()
    console.log('activedApps: ', activedApps);
    if (activedApps.length === 0 ) {
      navigateToUrl(path)
    }
  }, {
    once: true
  })
}

/**
 * activeFn
 *
 * @param {*} prefix url prefix
 * @returns
 */
function pathPrefix(prefix) {
  if(prefix === true) {
    return () => true
  }
  return function (location) {
    return location.pathname.startsWith(prefix);
  }
}

/**
 * register App
 *
 * @export
 * @param {*} name App Name
 * @param {*} url visit Url
 * @param {*} entry entry file
 * @param {*} customProps custom Props
 */
function registerApp({ name, url, entry, customProps = {} }) {
  return registerApplication(name, () => SystemJS.import(entry), pathPrefix(url), customProps);
}