import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaPreviewComponent } from './schema-preview.component';

describe('SchemaPreviewComponent', () => {
  let component: SchemaPreviewComponent;
  let fixture: ComponentFixture<SchemaPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
