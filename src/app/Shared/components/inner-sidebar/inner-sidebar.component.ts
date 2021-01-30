import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../Core/services/user/user.service';

@Component({
  selector: 'app-inner-sidebar',
  templateUrl: './inner-sidebar.component.html',
  styleUrls: ['./inner-sidebar.component.css']
})
export class InnerSidebarComponent implements OnInit {

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
