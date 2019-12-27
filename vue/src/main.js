import Vue from 'vue/dist/vue.min.js';
import router from './router';

new Vue({
  router,
  template: `
    <div id="vue-app">
      <router-view></router-view>        
    </div>
  `,
}).$mount(appMountDOMGetter())

function appMountDOMGetter() {
  let el = document.getElementById('vue-app');
  if (!el) {
      const el = document.createElement('div');
      el.id = 'vue-app';
      document.body.appendChild(el);
  }
  return el
}