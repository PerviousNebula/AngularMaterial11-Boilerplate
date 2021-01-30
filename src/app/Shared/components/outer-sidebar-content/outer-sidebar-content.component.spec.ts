import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

/* Material */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

/* Components */
import { OuterSidebarContentComponent } from './outer-sidebar-content.component';

/* Services */
import { SidebarService } from '../../../Core/services/sidebar/sidebar.service';
import { UserService } from '../../../Core/services/user/user.service';

describe('OuterSidebarContentComponent', () => {
  let component: OuterSidebarContentComponent;
  let fixture: ComponentFixture<OuterSidebarContentComponent>;
  const userServiceStub: Partial<UserService> = {
    menu: [{
      menuId: 1,
      title: 'Performance',
      icon: 'mat-perfomance',
      url: '',
      menuItems: [],
    }],
    logout(): void {}
  };
  const sidebarServiceStub: Partial<SidebarService> = {
    open: false,
    toggle(): void {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OuterSidebarContentComponent ],
      imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatExpansionModule,
      ],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: SidebarService, useValue: sidebarServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OuterSidebarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a toolbar', () => {
    const toolbar = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolbar).toBeTruthy();
  });

  it('should close the sidebar when the user clicks the hamburguer icon', () => {
    const sidebarService = fixture.debugElement.injector.get(SidebarService);
    const toggleSpy = spyOn(sidebarService, 'toggle');

    fixture.debugElement.query(By.css('button')).nativeElement.click();

    expect(toggleSpy).toHaveBeenCalledTimes(1);
    expect(sidebarService.open).toBeFalsy();
  });

  it('should render all the menu items correctly', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('mat-expansion-panel'));
    expect(menuItems.length).toBe(2, 'menu items plus logout button');
  });

  it('should logout when the user click the logout button', () => {
    const userService = fixture.debugElement.injector.get(UserService);
    const logoutSpy = spyOn(userService, 'logout');

    fixture.debugElement.queryAll(By.css('mat-expansion-panel'))[1].nativeElement.click();

    expect(logoutSpy).toHaveBeenCalledTimes(1);
  });

});
