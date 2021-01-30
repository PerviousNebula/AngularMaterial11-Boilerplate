import { SignOutGuard } from './sign-out.guard';

import { UserService } from '../../services/user/user.service';

describe('SignOutGuard', () => {
  let guard: SignOutGuard;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  describe('SignOutGuard with token', () => {

    beforeEach(() => {
      userServiceSpy = jasmine.createSpyObj('UserService', [''], {token: 'ABC123'});
      guard = new SignOutGuard(userServiceSpy as any);
    });

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });

    it('#canActive should not allow go to login page', () => {
      expect(guard.canActivate()).toBeFalsy();
    });

  });

  describe('SignOutGuard with no token', () => {

    beforeEach(() => {
      userServiceSpy = jasmine.createSpyObj('UserService', [''], {token: ''});
      guard = new SignOutGuard(userServiceSpy as any);
    });

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });

    it('#canActive should allow go to login page', () => {
      expect(guard.canActivate()).toBeTruthy();
    });

  });

});
