import { Routes } from '@angular/router';

import { LoginLayoutComponent } from './Login/login-layout.component';
import { ForgetLayoutComponent } from './Forget/forget-layout.component';


export const AuthRoutes: Routes = [
    {
        path: 'login',
        component: LoginLayoutComponent,
        children: [{ path: '', loadChildren: () => import('./Login/login.module').then(m => m.LoginModule) }],
    },
    {
        path: 'forget',
        component: ForgetLayoutComponent,
        children: [{ path: '', loadChildren: () => import('./Forget/forget.module').then(m => m.ForgetModule) }],
    },
    { path: '**', pathMatch: 'full', redirectTo: 'login' },
];
