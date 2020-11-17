import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPopupComponent } from './plan-popup.component';

describe('PlanPopupComponent', () => {
  let component: PlanPopupComponent;
  let fixture: ComponentFixture<PlanPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
