import singleSpaSvelte from 'single-spa-svelte';
import AppComponent from './app-component.svelte';

const svelteLifecycles = singleSpaSvelte({
  component: AppComponent,
  domElementGetter: () => document.getElementById('svelte-app'),
  data: { someData: 'data' }
});
export const bootstrap = svelteLifecycles.bootstrap;
export const mount = svelteLifecycles.mount;
export const unmount = svelteLifecycles.unmount;