<template>
  <section class="todoapp">
    <header class="header">
      <input
        class="new-todo"
        autocomplete="off"
        placeholder="Type your todo list"
        v-model="newTodo"
        @keyup.enter="addTodo"
      />
      <button class="new-todo-button" @click="addTodo" v-show="newTodo.length > 0"></button>
    </header>
    <section class="main" v-show="todos.length" v-cloak>
      <div class="completed-wrapper">
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone" />
        <label for="toggle-all">Complete all tasks</label>
        <button class="clear-completed" @click="removeCompleted">Clear completed</button>
      </div>
      <ul class="todo-list">
        <li
          v-for="todo in filteredTodos"
          class="todo"
          :key="todo.id"
          :class="{ completed: todo.completed, editing: todo == editedTodo }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed" />
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input
            class="edit"
            type="text"
            v-model="todo.title"
            v-todo-focus="todo == editedTodo"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
          />
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length" v-cloak>
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize }} left
      </span>
    </footer>
  </section>
</template>

<script>
const presetValues = [{
  "title":"Wake up at 5am",
  "completed":true
}, {
  "title":"Learn how to use Vue.js",
  "completed":false
}, {
  "title":"Drink coffee",
  "completed":false
}]

const STORAGE_KEY = "todo-app";
const todoStorage = {
  fetch: function() {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || presetValues;
    todos.forEach(function(todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

var filters = {
  all: function(todos) {
    return todos;
  },
  active: function(todos) {
    return todos.filter(function(todo) {
      return !todo.completed;
    });
  },
  completed: function(todos) {
    return todos.filter(function(todo) {
      return todo.completed;
    });
  }
};

export default {
  data(){
    return {
    todos: todoStorage.fetch(),
    newTodo: "",
    editedTodo: null,
    visibility: "all"
  }
  },
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos);
      },
      deep: true
    }
  },

  computed: {
    filteredTodos: function() {
      return filters[this.visibility](this.todos);
    },
    remaining: function() {
      return filters.active(this.todos).length;
    },
    allDone: {
      get: function() {
        return this.remaining === 0;
      },
      set: function(value) {
        this.todos.forEach(function(todo) {
          todo.completed = value;
        });
      }
    }
  },
  filters: {
    pluralize: function(n) {
      return n === 1 ? "task" : "tasks";
    }
  },

  methods: {
    addTodo: function() {
      var value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      });
      this.newTodo = "";
    },

    removeTodo: function(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },

    editTodo: function(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },

    doneEdit: function(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },

    cancelEdit: function(todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },

    removeCompleted: function() {
      this.todos = filters.active(this.todos);
    }
  },
  directives: {
    "todo-focus": function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  },
};
</script>

<style scoped>
.todoapp button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


.hidden {
  display: none;
}

.header:before {
    content: "";
    display: block;
    position: absolute;
    top: 13px;
    left: 13px;
    width: 65px;
    height: 65px;
    z-index: 1;
    opacity: 1;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNiAxMmgxMHYxaC0xMHYtMXptNy44MTYtM2gtNy44MTZ2MWg5LjA0N2MtLjQ1LS4yODMtLjg2My0uNjE4LTEuMjMxLTF6bS03LjgxNi0yaDYuNWMtLjEzNC0uMzItLjIzNy0uNjU2LS4zMTktMWgtNi4xODF2MXptMTMgMy45NzV2Mi41NjhjMCA0LjEwNy02IDIuNDU3LTYgMi40NTdzMS41MTggNi0yLjYzOCA2aC03LjM2MnYtMjBoOS41Yy4zMTItLjc0OS43NjMtMS40MjQgMS4zMTYtMmgtMTIuODE2djI0aDEwLjE4OWMzLjE2MyAwIDkuODExLTcuMjIzIDkuODExLTkuNjE0di0zLjg4NmMtLjYyMy4yNi0xLjI5Ny40MjEtMiAuNDc1em00LTYuNDc1YzAgMi40ODUtMi4wMTUgNC41LTQuNSA0LjVzLTQuNS0yLjAxNS00LjUtNC41IDIuMDE1LTQuNSA0LjUtNC41IDQuNSAyLjAxNSA0LjUgNC41em0tMi4xNTYtLjg4MmwtLjY5Ni0uNjk2LTIuMTE2IDIuMTY5LS45OTItLjk0MS0uNjk2LjY5NyAxLjY4OCAxLjYzNyAyLjgxMi0yLjg2NnoiLz48L3N2Zz4=");
    background-repeat: no-repeat;
    background-position: center;
  }

.todoapp {
  background: #fff;
  padding: 13px;
  margin: 130px auto 4px auto;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.2);
  max-width: 600px;
}

.todoapp input::-webkit-input-placeholder {
  font-weight: 400;
  color: #ddd;
}

.todoapp input::-moz-placeholder {
  font-weight: 400;
  color: #ddd;
}

.todoapp input::input-placeholder {
  font-weight: 400;
  color: #ddd;
}

.new-todo,
.edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  box-sizing: border-box;
}

.new-todo {
  padding: 16px 60px 16px 60px;
  border-radius: 10px;
  border: none;
  background: #efefef;
  transition: background 0.3s ease;
}
.new-todo:focus {
    background: #ddd;
  }
.new-todo-button {
  position: absolute;
  display: inline-block;
  width: 65px;
  height: 65px;
  right: 13px;
  top: 13px;
  transition: opacity 0.3s ease;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMmM1LjUxNCAwIDEwIDQuNDg2IDEwIDEwcy00LjQ4NiAxMC0xMCAxMC0xMC00LjQ4Ni0xMC0xMCA0LjQ4Ni0xMCAxMC0xMHptMC0yYy02LjYyNyAwLTEyIDUuMzczLTEyIDEyczUuMzczIDEyIDEyIDEyIDEyLTUuMzczIDEyLTEyLTUuMzczLTEyLTEyLTEyem02IDEzaC01djVoLTJ2LTVoLTV2LTJoNXYtNWgydjVoNXYyeiIvPjwvc3ZnPg==");
  background-repeat: no-repeat;
  background-position: center;
}

.main {
  position: relative;
  z-index: 2;
}

.completed-wrapper {
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle-all {
  width: 1px;
  height: 1px;
  border: none; /* Mobile Safari */
  opacity: 0;
  position: absolute;
  right: 100%;
  bottom: 100%;
}

.toggle-all + label {
  font-size: 12px;
  top: 13px;
  left: 13px;
  z-index: 99;
  cursor: pointer;
  color: #999;
  transition: color 0.3s ease;
}
.toggle-all + label :hover {
    color: #000;
  }
.toggle-all + label:before {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yNCA2LjI3OGwtMTEuMTYgMTIuNzIyLTYuODQtNiAxLjMxOS0xLjQ5IDUuMzQxIDQuNjg2IDkuODY1LTExLjE5NiAxLjQ3NSAxLjI3OHptLTIyLjY4MSA1LjIzMmw2LjgzNSA2LjAxLTEuMzE0IDEuNDgtNi44NC02IDEuMzE5LTEuNDl6bTkuMjc4LjIxOGw1LjkyMS02LjcyOCAxLjQ4MiAxLjI4NS01LjkyMSA2Ljc1Ni0xLjQ4Mi0xLjMxM3oiLz48L3N2Zz4=");
  background-repeat: no-repeat;
  background-position: center;
  content: "";
  font-size: 22px;
  opacity: 0.2;
  width: 57px;
  height: 40px;
  display: inline-block;
  vertical-align: middle;
}

.toggle-all:checked + label:before {
  opacity: 1;
}

.todo-list {
  margin: 13px 0;
  padding: 0;
  list-style: none;
}

.todo-list li {
  position: relative;
  font-size: 24px;
  border-radius: 10px;
  transition: background 0.3s ease;
  
}
.todo-list li:hover {
    background: #f8f8f8;
  }
.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li.editing {
  border-bottom: none;
  padding: 0;
  background: #fff;
}

.todo-list li.editing .edit {
  display: block;
  width: calc(100% - 43px);
  padding: 12px 16px;
  margin: 0 0 0 43px;
}

.todo-list li.editing .view {
  display: none;
}

.todo-list li .toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
}

.todo-list li .toggle {
  opacity: 0;
}

.todo-list li .toggle + label {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMmM1LjUxNCAwIDEwIDQuNDg2IDEwIDEwcy00LjQ4NiAxMC0xMCAxMC0xMC00LjQ4Ni0xMC0xMCA0LjQ4Ni0xMCAxMC0xMHptMC0yYy02LjYyNyAwLTEyIDUuMzczLTEyIDEyczUuMzczIDEyIDEyIDEyIDEyLTUuMzczIDEyLTEyLTUuMzczLTEyLTEyLTEyeiIvPjwvc3ZnPg==");
  background-repeat: no-repeat;
  background-position: 15px center;
}

.todo-list li .toggle:checked + label {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMmM1LjUxNCAwIDEwIDQuNDg2IDEwIDEwcy00LjQ4NiAxMC0xMCAxMC0xMC00LjQ4Ni0xMC0xMCA0LjQ4Ni0xMCAxMC0xMHptMC0yYy02LjYyNyAwLTEyIDUuMzczLTEyIDEyczUuMzczIDEyIDEyIDEyIDEyLTUuMzczIDEyLTEyLTUuMzczLTEyLTEyLTEyem00LjM5MyA3LjVsLTUuNjQzIDUuNzg0LTIuNjQ0LTIuNTA2LTEuODU2IDEuODU4IDQuNSA0LjM2NCA3LjUtNy42NDMtMS44NTctMS44NTd6Ii8+PC9zdmc+");
}

.todo-list li label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}

.todo-list li.completed label {
  text-decoration: line-through;
}

.todo-list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
  color: #af5b5e;
}

.todo-list li .destroy:after {
  content: "";
  width: 40px;
  height: 40px;
  display: inline-block;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMmM1LjUxNCAwIDEwIDQuNDg2IDEwIDEwcy00LjQ4NiAxMC0xMCAxMC0xMC00LjQ4Ni0xMC0xMCA0LjQ4Ni0xMCAxMC0xMHptMC0yYy02LjYyNyAwLTEyIDUuMzczLTEyIDEyczUuMzczIDEyIDEyIDEyIDEyLTUuMzczIDEyLTEyLTUuMzczLTEyLTEyLTEyem01IDE1LjUzOGwtMy41OTItMy41NDggMy41NDYtMy41ODctMS40MTYtMS40MDMtMy41NDUgMy41ODktMy41ODgtMy41NDMtMS40MDUgMS40MDUgMy41OTMgMy41NTItMy41NDcgMy41OTIgMS40MDUgMS40MDUgMy41NTUtMy41OTYgMy41OTEgMy41NSAxLjQwMy0xLjQxNnoiLz48L3N2Zz4=");
  background-repeat: no-repeat;
  background-position: center;
}

.todo-list li:hover .destroy {
  display: block;
}

.todo-list li .edit {
  display: none;
}

.footer {
  color: #999;
  padding: 10px 0 0 17px;
  border-top: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
}

.todo-count {
  text-align: left;
}

.todo-count strong {
  font-weight: bold;
  color: #555;
}

.filter a {
  color: inherit;
  text-decoration: none;
}
.filter a:hover,
.filter a.selected {
  color: #000;
}
.clear-completed {
  display: inline-block;
  line-height: 40px;
  color: #999;
}

.clear-completed,.clear-completed:active {
  text-decoration: none;
  cursor: pointer;
}

.clear-completed:hover {
  color: #000;
}
</style>