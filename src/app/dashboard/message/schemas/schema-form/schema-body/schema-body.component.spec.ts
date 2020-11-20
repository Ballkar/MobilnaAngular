import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaBodyComponent } from './schema-body.component';

describe('SchemaBodyComponent', () => {
  let component: SchemaBodyComponent;
  let fixture: ComponentFixture<SchemaBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
