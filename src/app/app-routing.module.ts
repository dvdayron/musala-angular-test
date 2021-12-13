import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './gateways/list/list.component';
import { EditComponent } from './gateways/edit/edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gateways', 
    pathMatch: 'full'
  },
  {
    path: 'gateways',
    component: ListComponent
  },
  {
    path: 'gateways/add',
    component: EditComponent
  },
  {
    path: 'gateways/edit/:id',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
