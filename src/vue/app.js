import Vue from 'vue/dist/vue.min.js';
import App from './index.vue';
import router from './router';
import singleSpaVue from 'single-spa-vue';
import Loading from './Loading.vue'

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    router,
    el:'#vue-app',
    template: `
      <div id="vue-app">
        <router-view></router-view>        
      </div>
    `,
    components:{
      App
    },
    loadRootComponent: Loading
  },
});

export const bootstrap = (props) => {
  console.log('vue-app is bootstrap')
  return vueLifecycles.bootstrap(props);
}
export const mount  = (props) =>  {
  console.log('vue-app is Mounted')
  return vueLifecycles.mount(props);
}
export const unmount  = (props) =>  {
  console.log('vue-app is unMounted')
  return vueLifecycles.unmount(props);
}