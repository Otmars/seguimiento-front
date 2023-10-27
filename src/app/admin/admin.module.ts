import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';

import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    ButtonModule
  ]
})
export class AdminModule { }
