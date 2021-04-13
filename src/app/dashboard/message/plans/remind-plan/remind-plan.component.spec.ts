import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindPlanComponent } from './remind-plan.component';

describe('RemindPlanComponent', () => {
  let component: RemindPlanComponent;
  let fixture: ComponentFixture<RemindPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
