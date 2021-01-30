import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './Core/guards/auth/auth.guard';
import { SignOutGuard } from './Core/guards/sign-out/sign-out.guard';

import { AuthLayoutComponent } from './Auth/auth-layout.component';
import { DashboardLayoutComponent } from './Dashboard/dashboard-layout.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthLayoutComponent,
        canActivate: [SignOutGuard],
        children: [{ path: '', loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule) }],
    },
    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        canActivate: [AuthGuard],
        children: [{ path: '', loadChildren: () => import('./Dashboard/dashboard.module').then(m => m.DashboardModule) }],
    },
    { path: '**', pathMatch: 'full', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ]
})
export class AppRoutingModule { }
