import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public open = false;

  constructor() { }

  public toggle(): void {
    this.open = !this.open;
  }
}
