import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../Core/services/sidebar/sidebar.service';


@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  options: any;

  constructor(
    public sidebarService: SidebarService,
  ) {
    this.options = {
      bottom: 0,
      fixed: false,
      top: 0
    };
  }

  ngOnInit(): void {
  }

}
