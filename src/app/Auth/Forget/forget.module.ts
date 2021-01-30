import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ForgetRoutes } from './forget.routing';

import { MaterialModule } from '../../material.module';

import { ForgetComponent } from './pages/forget/forget.component';
import { ForgetLayoutComponent } from './forget-layout.component';


@NgModule({
  declarations: [
    ForgetComponent,
    ForgetLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ForgetRoutes),
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class ForgetModule { }
