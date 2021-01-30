import { UserService } from './user.service';
import { of } from 'rxjs';

import { UserLoginResponse } from '../../models/';

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  let routerSpy: { navigateByUrl: jasmine.Spy };
  let sidebarServiceSpy: { toggle: jasmine.Spy }
  const token = 'ABC123';
  const menu = [{
    menuId: 1,
    title: 'Performance',
    icon: 'mat-perfomance',
    url: '',
    menuItems: [],
  }];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    sidebarServiceSpy = jasmine.createSpyObj('SidebarService', ['toggle']);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('menu', JSON.stringify(menu));
    service = new UserService(httpClientSpy as any, routerSpy as any, sidebarServiceSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get token and menu from SessionStorage when instanced', () => {
    expect(service.token).toBe(token);
    expect(service.menu).toEqual(menu);
  });

  it('#saveCredentials should store token and menu into SessionStorage', () => {
    const ssSetItemSpy = spyOn(sessionStorage, 'setItem');
    const userLoginResp: UserLoginResponse = { user: {}, menu, token };
    service.saveCredentials(userLoginResp);
    expect(ssSetItemSpy.calls.count()).toBe(2);
    expect(ssSetItemSpy).toHaveBeenCalledWith('token', userLoginResp.token);
    expect(ssSetItemSpy).toHaveBeenCalledWith('menu', JSON.stringify(userLoginResp.menu));
  });

  it('#loadCredentials should get token and menu from SessionStorage', () => {
    const ssGetItemSpy = spyOn(sessionStorage, 'getItem');
    service.loadCredentials();
    expect(ssGetItemSpy.calls.count()).toBe(2);
    expect(ssGetItemSpy).toHaveBeenCalledWith('token');
    expect(ssGetItemSpy).toHaveBeenCalledWith('menu');
  });

  it('#login should get the credentials', () => {
    const expectedLoginResp: UserLoginResponse = {
      user: {},
      menu,
      token
    };

    httpClientSpy.post.and.returnValue(of(expectedLoginResp));

    const email = 'email@email.com';
    const password = '1234';
    service.login(email, password).subscribe(
      () => {
        expect(service.token).toEqual(expectedLoginResp.token);
        expect(service.menu).toEqual(expectedLoginResp.menu);
      },
      fail
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('#logout should delete token, menu, clean SS and redirect to login page', () => {
    const ssRemoveItemSpy = spyOn(sessionStorage, 'removeItem');
    service.logout();
    expect(service.token).toBe('', 'expected token inital value');
    expect(service.menu).toEqual([], 'expected menu initial value');
    expect(ssRemoveItemSpy).toHaveBeenCalledWith('token');
    expect(ssRemoveItemSpy).toHaveBeenCalledWith('menu');
    expect(ssRemoveItemSpy.calls.count()).toBe(2, 'expected numbers of calls to SS');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/auth/login');
    expect(routerSpy.navigateByUrl.calls.count()).toBe(1, 'expected numbers of calls to router');
  });
});
