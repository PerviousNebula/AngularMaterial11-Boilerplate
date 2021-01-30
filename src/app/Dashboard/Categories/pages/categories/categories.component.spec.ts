import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageEvent } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

/* Material */
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

/* Components */
import { CategoriesComponent } from './categories.component';
import { CategoriesTableComponent } from '../../components/categories-table/categories-table.component';
import { CategoriesFilterFormComponent } from '../../components/categories-filter-form/categories-filter-form.component';

import { Category, CategoryResponse } from '../../../../Core/models/';
import { CategoryService } from '../../../../Core/services/category/category.service';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  const categoryServiceStub: Partial<CategoryService> = {
    getCategories: (pageNumber: number, pageSize: number, filter: Category) => new Observable<CategoryResponse>()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CategoriesFilterFormComponent,
        CategoriesTableComponent,
        CategoriesComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatGridListModule,
      ],
      providers: [{ provide: CategoryService, useValue: categoryServiceStub }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#filter should update categories values in component', () => {
    const categoryService = fixture.debugElement.injector.get(CategoryService);
    const getCategoriesSpy = spyOn(categoryService, 'getCategories');

    const filterValues = { name: 'Hombres', archive: false };
    component.filter(filterValues);

    expect(component.categoryFilter).toEqual(filterValues, 'expected filter values given');
    expect(getCategoriesSpy).toHaveBeenCalledTimes(1);
    expect(getCategoriesSpy).toHaveBeenCalledWith(1, 10, filterValues);
  });

  it('#handlePageChange should update categories values in component', () => {
    const categoryService = fixture.debugElement.injector.get(CategoryService);
    const getCategoriesSpy = spyOn(categoryService, 'getCategories');
    const paginationValues: PageEvent = {pageIndex: 2, pageSize: 10, length: 20, previousPageIndex: 1};

    component.handlePageChange(paginationValues);

    expect(getCategoriesSpy).toHaveBeenCalledTimes(1);
    expect(getCategoriesSpy)
      .toHaveBeenCalledWith(++paginationValues.pageIndex, paginationValues.pageSize, component.categoryFilter);
  });

  it('should have app-categories-filter-form component', () => {
    const filterFormComponent = fixture.debugElement.query(By.css('app-categories-filter-form'));
    expect(filterFormComponent).toBeTruthy();
  });

});
