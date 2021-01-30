import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';

import { Category, CategoryResponse } from '../../../../Core/models/';
import { CategoryService } from '../../../../Core/services/category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categoryResp$: Observable<CategoryResponse>;
  public categoryFilter: Category = {};

  constructor(
    private categoryService: CategoryService
  ) {
    this.categoryResp$ = this.categoryService.getCategories();
  }

  ngOnInit(): void { }

  public filter(formValues: Category): void {
    this.categoryFilter = formValues;
    this.categoryResp$ = this.categoryService.getCategories(1, 10, formValues);
  }

  public handlePageChange({ pageIndex: pageNumber, pageSize }: PageEvent): void {
    this.categoryResp$ = this.categoryService.getCategories(++pageNumber, pageSize, this.categoryFilter);
  }

}
