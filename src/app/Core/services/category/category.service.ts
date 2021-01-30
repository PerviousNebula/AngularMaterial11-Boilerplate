import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CategoryResponse, Category } from '../../models/';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getCategories(pageNo: number = 1, pageSize: number = 10, category?: Category): Observable<CategoryResponse> {
    let url = `${environment.serverApi}/category?pageNumber=${pageNo}&pageSize=${pageSize}`;

    if (category) {
      const { name, archive } = category;
      url += category.name ? `&name=${name}` : '';
      url += category.archive ? `&archive=${archive}` : '';
    }

    return this.http.get<CategoryResponse>(url, { observe: 'response' }).pipe(
      map<HttpResponse<any>, CategoryResponse>(res =>
        ({ categories: res.body, pagination: JSON.parse(res.headers.get('X-Pagination') || 'null') })
      )
    );
  }
}
