import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPopupComponentComponent } from './work-popup-component.component';

describe('WorkPopupComponentComponent', () => {
  let component: WorkPopupComponentComponent;
  let fixture: ComponentFixture<WorkPopupComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPopupComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPopupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
