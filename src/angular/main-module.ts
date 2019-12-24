import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import App from '@Ng/root.component.ts';
import { About } from '@Ng/routes/About.ts';
import { Home } from '@Ng/routes/Home.ts';
import { TodoList } from '@Ng/routes/TodoList.ts';
import { enableProdMode } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { APP_BASE_HREF } from "@angular/common";

const appRoutes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'about',
    component: About
  },
  {
    path: 'todoList',
    component: TodoList
  },
];

enableProdMode();

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {}),
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/angular' }],
  declarations: [
    App,
    Home,
    About,
    TodoList
  ],
  bootstrap: [App]
})
export default class MainModule {
}
