import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { CategoryResponse } from '../../../../Core/models/';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.css']
})
export class CategoriesTableComponent implements OnInit {
  public displayedColumns = ['index', 'name', 'archive', 'option'];

  @Input() data: CategoryResponse = {
    categories: [],
    pagination: {
      PageSize: 0,
      TotalCount: 0
    }
  };
  @Output() pagination = new EventEmitter<PageEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  public handlePageChange(values: PageEvent): void {
    this.pagination.emit(values);
  }

}
