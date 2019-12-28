<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./routes/home.svelte";
  import TodoList from "./routes/todolist.svelte";
  import canvas from "./routes/canvas.svelte";
  
  export let url = "";
</script>

<Router {url} basepath="/svelte">
  <nav class="app-nav">
    <ul class="nav-list">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="canvas">Canvas</Link>
      </li>
        <li>
        <Link to="todo">TodoList</Link>
      </li>
    </ul>
  </nav>
  <div class="app-box">
    <Route path="todo" component={TodoList} />
    <Route path="canvas" component={canvas} />
    <Route path="/" component={Home} />
  </div>
</Router>

<style>
.app-nav{
  width: 200px;
  float:left;
  height: calc(100vh - 64px);
  background: #393D49 ;
}
.nav-list{
  box-sizing: border-box;
  list-style: none;
}
.nav-list :global(li){
  padding: 10px 20px;
  transition: background-color .3s ease-in;
}
.nav-list :global(li):hover{
  background-color: #f5222d;
}
.nav-list :global(a) {
  line-height: 45px;
  color: #fff;
}
.app-box{
  width: calc(100% - 200px);
  padding:20px;
  margin-left: 200px;
  overflow: hidden;
}
:global(a),
:global(button) {
  transition: color 0.3s ease;
}
</style>