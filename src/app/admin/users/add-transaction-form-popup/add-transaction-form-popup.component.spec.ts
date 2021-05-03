import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionFormPopupComponent } from './add-transaction-form-popup.component';

describe('AddTransactionFormPopupComponent', () => {
  let component: AddTransactionFormPopupComponent;
  let fixture: ComponentFixture<AddTransactionFormPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransactionFormPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
