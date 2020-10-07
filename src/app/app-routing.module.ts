import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './components/tasks/tasks.component';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';
import { SignupComponent  } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

import {RegistraComponent } from './components/registra/registra.component';
import {HomeComponent } from './components/home/home.component';


import { AuthGuard } from './auth.guard'

const routes: Routes = [
  { path:'', redirectTo:'/home', pathMatch:'full' },
  { path:'tasks', component:TasksComponent },
  { path:'private', component:PrivateTasksComponent, canActivate: [AuthGuard] },
  { path:'signup', component:SignupComponent },
  { path:'signin', component:SigninComponent },

  { path:'registra', component:RegistraComponent, canActivate: [AuthGuard] },
  { path:'home', component:HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
