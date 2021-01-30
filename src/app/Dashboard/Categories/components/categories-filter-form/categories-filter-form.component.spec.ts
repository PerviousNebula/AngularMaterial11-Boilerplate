import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

/* Material */
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

import { CategoriesFilterFormComponent } from './categories-filter-form.component';

describe('CategoriesFilterFormComponent', () => {
  let component: CategoriesFilterFormComponent;
  let fixture: ComponentFixture<CategoriesFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesFilterFormComponent ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatButtonModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('categoriesFg should have name and archive fields', () => {
    expect(component.categoriesFg.contains('name')).toBeTruthy();
    expect(component.categoriesFg.contains('archive')).toBeTruthy();
  });

  it('#changeArchive should change archive value properly', () => {
    component.categoriesFg.controls.archive.setValue(false);
    component.changeArchive();
    expect(component.categoriesFg.controls.archive.value).toEqual(null, 'expected archive value');
    component.categoriesFg.controls.archive.setValue(true);
    component.changeArchive();
    expect(component.categoriesFg.controls.archive.value).toBeFalsy();
    component.categoriesFg.controls.archive.setValue(null);
    component.changeArchive();
    expect(component.categoriesFg.controls.archive.value).toBeTruthy();
  });

  it('#changeArchive should change HTML archive button text and color properly', async () => {
    const archiveBtn = fixture.debugElement.query(By.css('button'));
    archiveBtn.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(archiveBtn.nativeElement.innerText).toBe('Offline');
    expect(archiveBtn.attributes['ng-reflect-color']).toBe('warn');

    archiveBtn.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(archiveBtn.nativeElement.innerText).toBe('Online');
    expect(archiveBtn.attributes['ng-reflect-color']).toBe('primary');

    archiveBtn.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(archiveBtn.nativeElement.innerText).toBe('All');
    expect(archiveBtn.attributes['ng-reflect-color']).toBe('');
  });

  it('#filter should not let emit the form if it is invalid', () => {
    const formSubmittedSpy = spyOn(component.formSubmitted, 'emit');
    component.categoriesFg.controls.name.setErrors({required: true});
    component.filter();

    expect(formSubmittedSpy).not.toHaveBeenCalled();
  });

  it('#filter should emit the form', () => {
    const formSubmittedSpy = spyOn(component.formSubmitted, 'emit');
    const formValues = { name: 'Hombres', archive: false };
    component.categoriesFg.patchValue(formValues);
    component.filter();

    expect(formSubmittedSpy).toHaveBeenCalledWith(formValues);
    expect(formSubmittedSpy.calls.count()).toBe(1, 'number of times the form is emitted');
  });

  it('#filter should emit the value if the user fill out the form', () => {
    const formSubmittedSpy = spyOn(component.formSubmitted, 'emit');
    const categoryNameInput = fixture.debugElement.query(By.css('input'));
    categoryNameInput.nativeElement.value = 'Hombres';
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[0].nativeElement.click();
    buttons[1].nativeElement.click();

    expect(formSubmittedSpy).toHaveBeenCalled();
  });

});
