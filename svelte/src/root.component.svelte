<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./routes/home.svelte";
  import TodoList from "./routes/todolist.svelte";
  import canvas from "./routes/canvas.svelte";
  import { onDestroy } from "svelte";
  export let url = "";
  export let basepath = "/svelte";
  onDestroy(() => {
    url = "";
  });
</script>

<Router {url} {basepath}>
  <nav class="app-nav">
    <ul class="nav-list">
      <Link to="/">
        <li>Home</li>
      </Link>
      <Link to="canvas">
        <li>canvas</li>
      </Link>
      <Link to="todo">
        <li>TodoList</li>
      </Link>
    </ul>
  </nav>
  <div class="app-box">
    <Route path="/" component={Home} />
    <Route path="todo" component={TodoList} />
    <Route path="canvas" component={canvas} />
  </div>
</Router>



<style>
  .app-nav {
    width: 200px;
    float: left;
    height: calc(100vh - 64px);
    background: #393d49;
  }
  .nav-list {
    box-sizing: border-box;
    list-style: none;
  }
  .nav-list :global(li) {
    padding: 10px 20px;
    transition: background-color 0.3s ease-in;
  }
  .nav-list :global(li):hover {
    background-color: #f5222d;
  }
  .nav-list :global(a) {
    line-height: 45px;
    color: #fff;
  }
  .app-box {
    width: calc(100% - 200px);
    padding: 20px;
    margin-left: 200px;
    overflow: hidden;
  }
  :global(a),
  :global(button) {
    transition: color 0.3s ease;
  }
</style>