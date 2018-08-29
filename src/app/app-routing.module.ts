import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';

import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'user' },
  { path: 'user', component: UserListComponent /*, canActivate: [AuthGuard] */ }, // canActivate : conditionner le routage par des régles metiers  
  { path: 'user/edit', component: UserEditComponent /*, canActivate: [AuthGuard] */ }, // canActivate : conditionner le routage par des régles metiers  
  { path: 'user/:id', component: UserDetailComponent /*, canActivate: [AuthGuard] */ }, // canActivate : conditionner le routage par des régles metiers  
  { path: 'user/:id/edit', component: UserEditComponent /*, canActivate: [AuthGuard] */ }, // canActivate : conditionner le routage par des régles metiers  

  { path: '**', component: PageNotFoundComponent }, // 404

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, 
    { enableTracing: true } // tracer les ROUTES
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
