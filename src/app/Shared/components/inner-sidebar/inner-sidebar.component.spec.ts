import { ComponentFixture, TestBed, waitForAsync, inject } from '@angular/core/testing';
import { RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

/* Angular Material */
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

/* Components */
import { InnerSidebarComponent } from './inner-sidebar.component';
import { CategoriesComponent } from '../../../Dashboard/Categories/pages/categories/categories.component';

/* Services */
import { UserService } from '../../../Core/services/user/user.service';

describe('InnerSidebarComponent', () => {
  let component: InnerSidebarComponent;
  let fixture: ComponentFixture<InnerSidebarComponent>;
  const userServiceStub: Partial<UserService> = {
    menu: [{menuId: 1, icon: 'mat-bag', title: 'Categories', menuItems: [], url: '/categories'}],
    logout: () => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerSidebarComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'dashboard/categories', component: CategoriesComponent }
        ]),
        MatIconModule,
        MatGridListModule,
      ],
      providers: [{ provide: UserService, useValue: userServiceStub }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render userServices menu items', () => {
    const matGridTiles = fixture.debugElement.queryAll(By.css('mat-grid-tile'));
    expect(matGridTiles.length).toBe(2, 'menu elements and logout');
  });

  it('should build menu items with routerLinks properly', () => {
    const menuItems = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    const attr = 'href';

    expect(menuItems[0].attributes[attr]).toBe('/dashboard/categories');
  });

  it('should go to the appropriate page when the user clicks a menu item', waitForAsync(inject([Location], (location: Location) => {
    fixture.debugElement.query(By.directive(RouterLinkWithHref)).nativeElement.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => expect(location.path()).toEqual('/dashboard/categories'));
  })));

  it('should logout of the app when the user clicks the logout item', () => {
    const userService = fixture.debugElement.injector.get(UserService);
    const logoutSpy = spyOn(userService, 'logout');

    const menuItems = fixture.debugElement.queryAll(By.css('mat-grid-tile'));
    const logoutItem = menuItems[menuItems.length - 1];
    logoutItem.nativeElement.click();

    expect(logoutSpy).toHaveBeenCalledTimes(1);
  });

});
