import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(): boolean {
    if (!this.userService.token.length) {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
    return true;
  }

}
