import Vue from 'vue/dist/vue.min.js';
import VueRouter from 'vue-router'
import About from '@/routes/About.vue';
import TodoList from '@/routes/TodoList.vue';
import App from '@/root.component.vue';

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base:'/vue',
  routes: [
    {
      path:'/',
      component:App,
      children:[
        {
          path: 'about',
          component: About
        },
        {
          path: 'todoList',
          component: TodoList
        },
      ]
    }
  ]
})

export default router