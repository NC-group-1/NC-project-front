import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateProjectComponent} from './components/create-project/create-project.component';
import {ListProjectComponent} from './components/list-project/list-project.component';

const routes: Routes = [
  {path: 'createProject', component: CreateProjectComponent},
  {path: 'listProject', component: ListProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
