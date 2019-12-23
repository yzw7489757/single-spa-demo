<template>
  <div>
    <h1>Current is Vue-app.</h1>
     <form id="search">
      <div class="row">
        <div class="input-field col s12">
          <div class='input-field'>
            <input name="query" v-model="searchQuery">
            <label class="active" for="query">Search</label>
          </div>
        </div>
      </div>
    </form>
    <list
        :data="gridData"
        :columns="gridColumns"
        :filter-key="searchQuery">
    </list>
    <router-link to="/vue/vueRouterA">Go to RouterA</router-link>
    <router-link to="/vue/vueRouterB">Go to RouterB</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import list from './list.vue';
export default {
name:'app',
 data(){
   return {
      showFramework: false,
      border: '',
      searchQuery: '',
      gridColumns: ['name', 'power'],
      gridData: [
        { name: 'Chuck Norris', power: Infinity },
        { name: 'Bruce Lee', power: 9000 },
        { name: 'Jackie Chan', power: 7000 },
        { name: 'Jet Li', power: 8000 }
      ]
    }
 },
    components:{
      list
    },
}
</script>

<style>

</style>