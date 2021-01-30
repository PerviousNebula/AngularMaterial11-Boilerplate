import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../../../Core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginFg: FormGroup;
  public loading = false;

  constructor(
    private userService: UserService
  ) {
    this.loginFg = new FormGroup({
      email: new FormControl(localStorage.getItem('remember'), [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      remember: new FormControl(localStorage.getItem('remember') ? true : false),
    });
  }

  ngOnInit(): void {
  }

  public get emailError(): string {
    if (this.loginFg.get('email')?.hasError('required')) {
      return 'Email is required';
    }

    return this.loginFg.get('email')?.hasError('email') ? 'Invalid email address' : '';
  }

  public login(): void {
    if (this.loginFg.invalid) {
      return;
    }

    this.loading = true;
    const { email, password, remember } = this.loginFg.value;
    if (remember) { localStorage.setItem('remember', email); }
    this.userService.login(email, password).subscribe(() => this.loading = false);
  }

}
