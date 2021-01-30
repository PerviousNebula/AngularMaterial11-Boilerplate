import { Routes } from '@angular/router';

import { CategoriesComponent } from './pages/categories/categories.component';


export const CategoriesRoutes: Routes = [
    { path: '', component: CategoriesComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' },
];
