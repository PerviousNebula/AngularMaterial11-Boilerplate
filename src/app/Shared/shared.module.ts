import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { InnerSidebarComponent } from './components/inner-sidebar/inner-sidebar.component';
import { OuterSidebarContentComponent } from './components/outer-sidebar-content/outer-sidebar-content.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    InnerSidebarComponent,
    OuterSidebarContentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    ToolbarComponent,
    InnerSidebarComponent,
    OuterSidebarContentComponent,
  ]
})
export class SharedModule { }
