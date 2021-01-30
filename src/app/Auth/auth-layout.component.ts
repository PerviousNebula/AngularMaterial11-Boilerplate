import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {
  public isMobile = false;

  constructor(private breakPoint$: BreakpointObserver) {
    this.breakPoint$.observe(['(max-width: 922px)']).pipe(
      map(({ matches }: any) => matches)
    ).subscribe(mobile => this.isMobile = mobile);
  }

  ngOnInit(): void {
  }

}
