import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

/* Angular Material */
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/* Components */
import { LoginComponent } from './login.component';
import { ForgetComponent } from '../../../Forget/pages/forget/forget.component';

/* Services */
import { UserService } from '../../../../Core/services/user/user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const userServiceStub: Partial<UserService> = {
    login: (email: string, password: string) => new Observable<void>()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'auth/forget', component: ForgetComponent }
        ]),
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [{ provide: UserService, useValue: userServiceStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loginFg should have email and password fields', () => {
    expect(component.loginFg.contains('email')).toBeTruthy();
    expect(component.loginFg.contains('password')).toBeTruthy();
  });

  it('loginFg email control should be required and email', () => {
    const control = component.loginFg.controls.email;
    control.setValue('');
    expect(control.valid).toBeFalse();
    control.setValue('email.com');
    expect(control.valid).toBeFalse();
    control.setValue('email@gmail.com');
    expect(control.valid).toBeTrue();
  });

  it('loginFg password control should be required', () => {
    const control = component.loginFg.controls.password;
    control.setValue('');
    expect(control.valid).toBeFalse();
    control.setValue('1234');
    expect(control.valid).toBeTrue();
  });

  it('#emailError should return "Email is required"', () => {
    component.loginFg.controls.email.setValue('');
    const error = component.emailError;
    expect(error).toBe('Email is required');
  });

  it('#emailError should return "Invalid email address"', () => {
    const control = component.loginFg.controls.email;
    control.setValue('email.com');
    const error = component.emailError;
    expect(error).toBe('Invalid email address');
  });

  it('should show card title and subtitle', () => {
    const h2Elem: HTMLElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(h2Elem.innerHTML.trim()).toContain('Welcome!');
    const pElem: HTMLElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(pElem.innerHTML.trim()).toContain('Sign in by entering the information below');
  });

  it('should have submit button disabled if form is invalid', () => {
    const btnElem: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(btnElem.hasAttribute('disabled')).toBeTrue();
  });

  it('should show "Email is required" if the user does not enter a value', async () => {
    component.loginFg.controls.email.setValue('');
    component.loginFg.controls.email.markAsTouched();
    fixture.detectChanges();

    await fixture.whenStable();

    const matErrorElem: HTMLElement = fixture.debugElement.query(By.css('mat-error')).nativeElement;
    expect(matErrorElem.innerHTML.trim()).toBe('Email is required');
  });

  it('should show "Invalid email address" if the user enter an invalid email address', async () => {
    component.loginFg.controls.email.setValue('email.com');
    component.loginFg.controls.email.markAsTouched();
    fixture.detectChanges();

    await fixture.whenStable();

    const matErrorElem: HTMLElement = fixture.debugElement.query(By.css('mat-error')).nativeElement;
    expect(matErrorElem.innerHTML.trim()).toBe('Invalid email address');
  });

  it('should submit the form', () => {
    const loginSpy = spyOn(component, 'login');

    const inputElems = fixture.debugElement.queryAll(By.css('input'));
    const formElem = fixture.debugElement.query(By.css('form'));

    inputElems[0].nativeElement.value = 'email@gmail.com';
    inputElems[1].nativeElement.value = '1234';

    formElem.triggerEventHandler('ngSubmit', null);

    expect(loginSpy).toHaveBeenCalled();
  });

  it('should store the email address when the user checks "Remember Me"', () => {
    const lsSpy = spyOn(localStorage, 'setItem').and.callThrough();
    component.loginFg.patchValue({ email: 'email@email.com', password: '1234', remember: true });
    component.login();

    expect(lsSpy).toHaveBeenCalled();
  });

  it('should have an anchor tag to go to forget password page', () => {
    const anchorElem = fixture.debugElement.query(By.directive(RouterLinkWithHref));
    const key = 'routerLink';
    const url = '/auth/forget';
    expect(anchorElem.attributes[key]).toBe(url);
  });

  it('should go to /auth/forget', waitForAsync(inject([Location], (location: Location) => {
    fixture.debugElement.query(By.directive(RouterLinkWithHref)).nativeElement.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => expect(location.path()).toEqual('/auth/forget'));
  })));

});
