import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { Category, Pagination } from '../../models/';

import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new CategoryService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getCategories should return categories', () => {
    const expectedBody: Category[] = [{ categoryId: 1, name: 'Hombres', archive: false }];
    const expectedHeaders: Pagination = {
      CurrentPage: 1,
      TotalPages: 1,
      PageSize: 10,
      TotalCount: 1,
      HasPrevious: false,
      HasNext: false,
    };
    const httpHeaders = new HttpHeaders({ 'X-Pagination': JSON.stringify(expectedHeaders) });
    const httpResponse = new HttpResponse({ body: expectedBody, headers: httpHeaders });

    httpClientSpy.get.and.returnValue(of(httpResponse));

    service.getCategories().subscribe(
      res => {
        expect(res.categories).toEqual(expectedBody, 'expected categories');
        expect(res.pagination).toEqual(expectedHeaders, 'expected pagination');
      },
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

});
