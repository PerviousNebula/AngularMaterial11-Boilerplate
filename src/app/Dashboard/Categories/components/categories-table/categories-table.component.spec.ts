import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Material */
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { CategoriesTableComponent } from './categories-table.component';

describe('CategoriesTableComponent', () => {
  let component: CategoriesTableComponent;
  let fixture: ComponentFixture<CategoriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesTableComponent ],
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#handlePageChange should emit the pagination values', () => {
    const handlePageChangeSpy = spyOn(component.pagination, 'emit');
    const paginationValues: PageEvent = {
      pageIndex: 1,
      pageSize: 10,
      length: 10,
    };
    component.handlePageChange(paginationValues);

    expect(handlePageChangeSpy).toHaveBeenCalledWith(paginationValues);
    expect(handlePageChangeSpy.calls.count()).toBe(1, 'page values times emitted');;
  });

});
