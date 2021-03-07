import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkDisplayerComponent } from './work-displayer.component';

describe('WorkDisplayerComponent', () => {
  let component: WorkDisplayerComponent;
  let fixture: ComponentFixture<WorkDisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkDisplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
