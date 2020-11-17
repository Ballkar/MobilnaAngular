import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMessagePlanPopupComponent } from './add-message-plan-popup.component';

describe('AddMessagePlanPopupComponent', () => {
  let component: AddMessagePlanPopupComponent;
  let fixture: ComponentFixture<AddMessagePlanPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMessagePlanPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMessagePlanPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
