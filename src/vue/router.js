import Vue from 'vue/dist/vue.min.js';
import VueRouter from 'vue-router'
import ComponentA from './router-a-component.vue';
import ComponentB from './router-b-component.vue';
import App from './index.vue';

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path:'/vue',
      component:App,
      children:[
        {
          path: 'vueRouterA',
          component: ComponentA
        },
        {
          path: 'vueRouterB',
          component: ComponentB
        },
      ]
    }
  ]
})

export default router