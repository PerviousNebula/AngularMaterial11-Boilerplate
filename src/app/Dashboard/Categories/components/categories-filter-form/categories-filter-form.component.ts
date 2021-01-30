import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

import { Category } from '../../../../Core/models/';

@Component({
  selector: 'app-categories-filter-form',
  templateUrl: './categories-filter-form.component.html',
  styleUrls: ['./categories-filter-form.component.css']
})
export class CategoriesFilterFormComponent implements OnInit {
  public categoriesFg: FormGroup;
  public isMobile = false;

  @Output() formSubmitted = new EventEmitter<Category>();

  constructor(
    private breakPoint$: BreakpointObserver
  ) {
    this.categoriesFg = new FormGroup({
      name: new FormControl(null),
      archive: new FormControl(null),
    });
    this.breakPoint$.observe([Breakpoints.Handset]).pipe(
      map(({ matches }: any) => matches)
    ).subscribe(mobile => this.isMobile = mobile );
  }

  ngOnInit(): void {
  }

  public changeArchive(): void {
    if (this.categoriesFg.value.archive === false) {
      this.categoriesFg.controls.archive.reset();
    } else {
      const { archive } = this.categoriesFg.value;
      this.categoriesFg.patchValue({ archive: !archive });
    }
  }

  public filter(): void {
    if (this.categoriesFg.invalid) {
      return;
    }

    this.formSubmitted.emit(this.categoriesFg.value);
  }

}
