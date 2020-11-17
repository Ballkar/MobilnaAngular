import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaPopupComponent } from './schema-popup.component';

describe('SchemaPopupComponent', () => {
  let component: SchemaPopupComponent;
  let fixture: ComponentFixture<SchemaPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
