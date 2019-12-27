import {
  getMountedApps,
  registerApplication,
  start,
  navigateToUrl,
  getAppNames
} from 'single-spa';
console.log(1)
const apps = [
  { name: 'nav', url: true, entry: '/nav-app/app.js', customProps: {} },
  { name: 'react', url: '/react', entry: '/react-app/app.js', customProps: {} },
  { name: 'vue', url: '/vue', entry: '/vue-app/app.js', customProps: {} },
  { name: 'svelte', url: '/svelte', entry: '/svelte-app/app.js', customProps: {} },
  { name: 'angular', url: '/angular', entry: '/angular-app/app.js', customProps: {} },
]

async function initialPage() {
  await Promise.all(apps.map(registerApp))
  await start();
  // setDefaultMountedApp('/react');
}

initialPage();

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
    return location.pathname.startsWith(`${prefix}`);
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
  registerApplication(name, () => SystemJS.import(entry), pathPrefix(url), customProps);
}