import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelseEditingPopupComponent } from './labelse-editing-popup.component';

describe('LabelseEditingPopupComponent', () => {
  let component: LabelseEditingPopupComponent;
  let fixture: ComponentFixture<LabelseEditingPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelseEditingPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelseEditingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
