import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginRoutes } from './login.routing';

import { MaterialModule } from '../../material.module';

import { LoginComponent } from './pages/login/login.component';
import { LoginLayoutComponent } from './login-layout.component';


@NgModule({
  declarations: [
    LoginComponent,
    LoginLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class LoginModule { }
