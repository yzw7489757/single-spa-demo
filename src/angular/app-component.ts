import {Component} from '@angular/core';

@Component({
  selector: 'angularApp',
  template: `
    <h1>
      Current is Angular-app.
    </h1>
    <a [routerLink]="['/subroute1']" routerLinkActive="active">Angular route 1</a>
    <a [routerLink]="['/subroute2']" routerLinkActive="active">Angular route 2</a>

    <router-outlet></router-outlet>
  `,
})
export default class AppComponent {
}
