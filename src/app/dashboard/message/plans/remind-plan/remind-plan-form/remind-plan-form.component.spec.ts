import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindPlanFormComponent } from './remind-plan-form.component';

describe('RemindPlanFormComponent', () => {
  let component: RemindPlanFormComponent;
  let fixture: ComponentFixture<RemindPlanFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindPlanFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
