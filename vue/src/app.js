import Vue from 'vue/dist/vue.min.js';
import router from './router';
import singleSpaVue from 'single-spa-vue';
import Loading from './components/Loading.vue'
import App from './app.vue';

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    router,
    el: '#vue-app',
    render: h => h(App),
    loadRootComponent: Loading
  },
});

function appMountDOMGetter() {
  let el = document.getElementById('vue-app');
  if (!el) {
      el = document.createElement('div');
      el.id = 'vue-app';
      document.body.appendChild(el);
  }
  return el
}


export const bootstrap = (props) => {
  console.log('vue-app is bootstrap')
  return vueLifecycles.bootstrap(props);
}

export const mount  = (props) =>  {
  appMountDOMGetter()
  console.log('vue-app is Mounted')
  return vueLifecycles.mount(props);
}
export const unmount  = (props) =>  {
  console.log('vue-app is unMounted')
  return vueLifecycles.unmount(props);
}