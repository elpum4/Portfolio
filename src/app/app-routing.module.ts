import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { ExpComponent} from './components/exp/exp.component';
import {ProjectComponent} from './components/project/project.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'projects',
    component: ProjectComponent
  },
  {
    path: 'experiencia',
    component: ExpComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
