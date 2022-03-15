import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { EducationComponent } from './components/education/education.component';
import { ExpComponent} from './components/exp/exp.component';
import {ProjectComponent} from './components/project/project.component';
import { SkillComponent} from './components/skill/skill.component';
const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'education',
    component: EducationComponent,
  },
  {
    path: 'xp',
    component: ExpComponent,
  },
  {
    path: 'project',
    component: ProjectComponent,
  },
  {
    path: 'skill',
    component: SkillComponent,
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
