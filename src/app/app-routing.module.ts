import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/todo-list/todo-list.module#TodoListPageModule' },
  { path: 'todo', loadChildren: './pages/todo-detail/todo-detail.module#TodoDetailPageModule' },
  { path: 'todo/:id', loadChildren: './pages/todo-detail/todo-detail.module#TodoDetailPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
