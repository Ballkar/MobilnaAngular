import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitMessagePopupComponent } from './init-message-popup.component';

describe('InitMessagePopupComponent', () => {
  let component: InitMessagePopupComponent;
  let fixture: ComponentFixture<InitMessagePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitMessagePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitMessagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
