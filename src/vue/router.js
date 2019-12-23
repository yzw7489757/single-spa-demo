import Vue from 'vue/dist/vue.min.js';
import VueRouter from 'vue-router'
import About from '@Vue/routes/About.vue';
import TodoList from '@Vue/routes/TodoList.vue';
import App from '@Vue/index.vue';

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