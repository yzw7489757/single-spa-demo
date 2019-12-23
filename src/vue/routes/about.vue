<template>
  <div class="about">
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
  </div>
</template>

<script>
import list from '@Vue/components/list.vue';
export default {
  name:'about',
  data(){
    return {
      searchQuery: '',
      gridColumns: ['name', 'power','type'],
      gridData: [
        { name: 'Apple', power: Infinity,type:'' },
        { name: 'Banana', power: 9000,type:'🍌' },
        { name: 'Orange', power: 7000,type:'🍊' },
        { name: 'eggplant', power: 8000,type:'🍆' }
      ]
    }
  },
  components:{
      list
    },
}
</script>

<style scoped>
.about{
  padding: 20px;
}
</style>