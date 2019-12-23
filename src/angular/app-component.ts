import {Component} from '@angular/core';
import '../../assets/styles/public.css';

@Component({
  selector: 'angularApp',
  template: `
    <nav class="app-nav">
      <ul class="nav-list">
        <li>
          <a [routerLink]="['']" routerLinkActive="active">Home</a>
        </li>
        <li>
          <a [routerLink]="['/about']" routerLinkActive="active">About</a>
        </li>
        <li>
          <a [routerLink]="['/todoList']" routerLinkActive="active">Todo List</a>
        </li>
      </ul>
    </nav>
    <div class="app-box">
      <h1>
        Current is Angular-app.
      </h1>
      <router-outlet></router-outlet> 
    </div>
  `,
})
export default class AppComponent {
}
