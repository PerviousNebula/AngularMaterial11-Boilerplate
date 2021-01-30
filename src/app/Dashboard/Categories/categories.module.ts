import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../../material.module';

import { CategoriesRoutes } from './categories.routing';

import { CategoriesLayoutComponent } from './categories-layout.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoriesFilterFormComponent } from './components/categories-filter-form/categories-filter-form.component';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';

@NgModule({
  declarations: [
    CategoriesLayoutComponent,
    CategoriesComponent,
    CategoriesFilterFormComponent,
    CategoriesTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CategoriesRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class CategoriesModule { }
