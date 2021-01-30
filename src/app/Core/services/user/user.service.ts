import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { UserLoginResponse, Menu } from '../../models/';

import { SidebarService } from '../sidebar/sidebar.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public token = '';
  public menu: Menu[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private sidebarService: SidebarService
  ) {
    this.loadCredentials();
  }

  public login(email: string, password: string): Observable<void> {
    return this.http.post<UserLoginResponse>(`${environment.serverApi}/User/login`, { email, password })
      .pipe(
        map(resp => {
          this.saveCredentials(resp);
          this.router.navigateByUrl('/dashboard');
        })
      );
  }

  public logout(): void {
    this.token = '';
    this.router.navigateByUrl('/auth/login');
    this.menu = [];
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('menu');
    this.sidebarService.open = false;
  }

  public saveCredentials({ token, menu }: UserLoginResponse): void {
    this.token = token;
    this.menu = menu;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('menu', JSON.stringify(menu));
  }

  public loadCredentials(): void {
    this.token = sessionStorage.getItem('token') || '';
    this.menu = JSON.parse(sessionStorage.getItem('menu') || '[]');
  }

}
