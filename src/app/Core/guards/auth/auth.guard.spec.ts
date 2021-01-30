import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { UserService } from '../../services/user/user.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  describe('AuthGuard with token', () => {

    beforeEach(() => {
      userServiceSpy = jasmine.createSpyObj('UserService', [''], {token: 'ABC123'});
      routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
      guard = new AuthGuard(routerSpy as any, userServiceSpy as any);
    });

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });

    it('#canActivate should allow go to dashboard', () => {
      expect(guard.canActivate()).toBeTruthy();
    });

  });

  describe('AuthGuard with no token', () => {

    beforeEach(() => {
      userServiceSpy = jasmine.createSpyObj('UserService', [''], {token: ''});
      routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
      guard = new AuthGuard(routerSpy as any, userServiceSpy as any);
    });

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });

    it('#canActivate should not allow go to dashboard', () => {
      userServiceSpy.token = '';
      expect(guard.canActivate()).toBeFalsy();
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/auth/login');
    });

  });

});
