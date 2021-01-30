import { Routes } from '@angular/router';

import { ForgetComponent } from './pages/forget/forget.component';


export const ForgetRoutes: Routes = [
    { path: '', component: ForgetComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' },
];
