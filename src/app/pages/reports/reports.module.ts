import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { TablesComponent } from './tables/tables.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { PoliticalPartiesComponent } from './political-parties/political-parties.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TablesComponent,
    CandidatesComponent,
    PoliticalPartiesComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class ReportsModule { }
