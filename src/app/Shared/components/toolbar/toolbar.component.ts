import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../../Core/services/sidebar/sidebar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    public sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
  }

}
