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
@import '/assets/styles/public.css';
</style>