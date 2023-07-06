import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCompaniesComponent } from './all-companies.component';

describe('AllCompaniesComponent', () => {
  let component: AllCompaniesComponent;
  let fixture: ComponentFixture<AllCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
