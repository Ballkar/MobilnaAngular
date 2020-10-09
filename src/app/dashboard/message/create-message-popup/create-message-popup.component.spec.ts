import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMessagePopupComponent } from './create-message-popup.component';

describe('CreateMessagePopupComponent', () => {
  let component: CreateMessagePopupComponent;
  let fixture: ComponentFixture<CreateMessagePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMessagePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMessagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
