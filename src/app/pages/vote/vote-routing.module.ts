import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from '../table/list/list.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: 'listar',
    component: ListComponent
  },
  {
    path: 'crear',
    component: CreateComponent
  },
  {
    path: 'actualizar/:voteId',
    component: CreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoteRoutingModule { }
