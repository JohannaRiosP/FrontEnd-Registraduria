import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class UserModule { }
