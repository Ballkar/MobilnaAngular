import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelChooseComponent } from './label-choose.component';

describe('LabelChooseComponent', () => {
  let component: LabelChooseComponent;
  let fixture: ComponentFixture<LabelChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
