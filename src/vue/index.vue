<template>
  <div>
    <nav class="app-nav">
      <ul class="nav-list">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/todoList">Todo List</router-link>
        </li>
      </ul>
    </nav>
    <div class="app-box">
      <h1>Current is Vue-app.</h1>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
name:'app',
 data(){
   return {
       
    }
 },
}
</script>

<style>
@import '../../assets/styles/public.css';
</style>