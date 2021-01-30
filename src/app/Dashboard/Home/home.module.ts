import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeRoutes } from './home.routing';

import { MonitorComponent } from './pages/monitor/monitor.component';
import { HomeLayoutComponent } from './home-layout.component';


@NgModule({
  declarations: [
    MonitorComponent,
    HomeLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
  ]
})
export class HomeModule { }
