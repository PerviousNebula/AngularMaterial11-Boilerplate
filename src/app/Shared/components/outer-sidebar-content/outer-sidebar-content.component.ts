import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../Core/services/user/user.service';
import { SidebarService } from '../../../Core/services/sidebar/sidebar.service';

@Component({
  selector: 'app-outer-sidebar-content',
  templateUrl: './outer-sidebar-content.component.html',
  styleUrls: ['./outer-sidebar-content.component.css']
})
export class OuterSidebarContentComponent implements OnInit {
  public panelOpenState = false;

  constructor(
    public userService: UserService,
    public sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
  }

}
