import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindPlanPopupComponent } from './remind-plan-popup.component';

describe('RemindPlanPopupComponent', () => {
  let component: RemindPlanPopupComponent;
  let fixture: ComponentFixture<RemindPlanPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindPlanPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindPlanPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
