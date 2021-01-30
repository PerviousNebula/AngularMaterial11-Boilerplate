import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { UserService } from '../../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SignOutGuard implements CanActivate {

  constructor(private userService: UserService) {}

  canActivate(): boolean {
    return this.userService.token.length <= 0;
  }

}
