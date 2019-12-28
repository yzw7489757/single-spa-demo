import Vue from 'vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './app.vue'
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
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