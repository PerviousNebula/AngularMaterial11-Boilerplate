import { Routes } from '@angular/router';

import { MonitorComponent } from './pages/monitor/monitor.component';


export const HomeRoutes: Routes = [
    { path: '', component: MonitorComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' },
];
