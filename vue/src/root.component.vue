<template>
  <div>
    <nav class="app-nav">
      <ul class="nav-list">
          <router-link to="/" tag="li">Home</router-link>
          <router-link to="/about" tag="li">About</router-link>
          <router-link to="/todoList" tag="li">Todo List</router-link>
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

<style scoped>
@import './styles/app-nav.css';
</style>