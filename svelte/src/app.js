import singleSpaSvelte from 'single-spa-svelte';
import AppComponent from './root.component.svelte';

const svelteLifecycles = singleSpaSvelte({
  component: AppComponent,
  domElementGetter,
});
export const bootstrap = (props)=> {
  console.log('svelte-app is bootstrap')
  return svelteLifecycles.bootstrap(props);
}
export const mount = (props)=> {
  console.log('svelte-app is Mounted')
  return svelteLifecycles.mount(props);
}
export const unmount = (props)=> {
  console.log('svelte-app is unMounted')
  
  return svelteLifecycles.unmount(props);
}

function domElementGetter() {
  let el = document.getElementById('svelte-app');
  if(!el){
    el = document.createElement('div');
    el.id = 'svelte-app';
    document.body.appendChild(el);
  }
  return el
}