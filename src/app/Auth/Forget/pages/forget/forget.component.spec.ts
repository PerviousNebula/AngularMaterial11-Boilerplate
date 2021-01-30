import { ComponentFixture, TestBed, waitForAsync, inject } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

/* Angular Material */
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ForgetComponent } from './forget.component';
import { LoginComponent } from '../../../Login/pages/login/login.component';

describe('ForgetComponent', () => {
  let component: ForgetComponent;
  let fixture: ComponentFixture<ForgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetComponent ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'auth/login', component: LoginComponent }
        ]),
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('forgetFg email control should be required and email', () => {
    const control = component.forgetFg.controls.email;
    control.setValue('');
    expect(control.invalid).toBeTruthy();
    control.setValue('email.com');
    expect(control.invalid).toBeTruthy();
    control.setValue('email@email.com');
    expect(control.valid).toBeTruthy();
  });

  it('#emailError should return "Email is required"', () => {
    expect(component.emailError).toBe('Email is required');
  });

  it('#emailError should return "Invalid email address"', () => {
    component.forgetFg.controls.email.setValue('email.com');
    expect(component.emailError).toBe('Invalid email address');
  });

  it('should show card title and subtitle', () => {
    const h2Elem: HTMLElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(h2Elem.innerHTML).toBe('Forget your password?');
    const pElem: HTMLElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(pElem.innerHTML).toBe(`Enter your email below, and we'll send you the Reset Link`);
  });

  it('should have button disabled if form is invalid', () => {
    const btnElem: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(btnElem.hasAttribute('disabled')).toBeTruthy();
  });

  it('should show "Email is required" if the user does not enter a value', async () => {
    const control = component.forgetFg.controls.email;
    control.setValue('');
    control.markAsTouched();
    fixture.detectChanges();

    await fixture.whenStable();

    const matErrorElem: HTMLElement = fixture.debugElement.query(By.css('mat-error')).nativeElement;
    expect(matErrorElem.innerHTML).toBe('Email is required');
  });

  it('should show "Invalid email address" if the user enter an invalid email address', async () => {
    const control = component.forgetFg.controls.email;
    control.setValue('email.com');
    control.markAsTouched();
    fixture.detectChanges();

    await fixture.whenStable();

    const matErrorElem: HTMLElement = fixture.debugElement.query(By.css('mat-error')).nativeElement;
    expect(matErrorElem.innerHTML).toBe('Invalid email address');
  });

  it('should submit the form', () => {
    const forgetSpy = spyOn(component, 'forget');

    const emailElem = fixture.debugElement.query(By.css('input')).nativeElement;
    emailElem.value = 'email@email.com';

    const formElem = fixture.debugElement.query(By.css('form'));
    formElem.triggerEventHandler('ngSubmit', null);

    expect(forgetSpy).toHaveBeenCalled();
  });

  it('should have anchor tag to go to login page', () => {
    const anchorElem = fixture.debugElement.query(By.directive(RouterLinkWithHref));
    const key = 'routerLink';
    const url = '/auth/login';
    expect(anchorElem.attributes[key]).toBe(url);
  });

  it('should go to /auth/login', waitForAsync(inject([Location], (location: Location) => {
    fixture.debugElement.query(By.directive(RouterLinkWithHref)).nativeElement.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => expect(location.path()).toBe('/auth/login'));
  })));

});
