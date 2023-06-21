import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnedTasksComponent } from './owned-tasks.component';

describe('OwnedTasksComponent', () => {
  let component: OwnedTasksComponent;
  let fixture: ComponentFixture<OwnedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnedTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
