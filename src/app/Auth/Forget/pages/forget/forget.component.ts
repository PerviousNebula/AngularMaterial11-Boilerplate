import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  public forgetFg: FormGroup;

  constructor() {
    this.forgetFg = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
  }

  public get emailError(): string {
    if (this.forgetFg.get('email')?.hasError('required')) {
      return 'Email is required';
    }

    return this.forgetFg.get('email')?.hasError('email') ? 'Invalid email address' : '';
  }

  public forget(): void {
    if (this.forgetFg.invalid) {
      return;
    }

    console.log(this.forgetFg.value);
  }

}
