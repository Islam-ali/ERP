import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNotesComponent } from './form-notes.component';

describe('FormNotesComponent', () => {
  let component: FormNotesComponent;
  let fixture: ComponentFixture<FormNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
