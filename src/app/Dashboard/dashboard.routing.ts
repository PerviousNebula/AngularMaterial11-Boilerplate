import { Routes } from '@angular/router';

import { HomeLayoutComponent } from './Home/home-layout.component';
import { CategoriesLayoutComponent } from './Categories/categories-layout.component';


export const DashboardRoutes: Routes = [
    {
        path: 'home',
        component: HomeLayoutComponent,
        children: [{ path: '', loadChildren: () => import('./Home/home.module').then(m => m.HomeModule) }],
    },
    {
        path: 'categories',
        component: CategoriesLayoutComponent,
        children: [{ path: '', loadChildren: () => import('./Categories/categories.module').then(m => m.CategoriesModule) }],
    },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
