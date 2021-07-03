import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCubeComponent } from './schedule-cube.component';

describe('ScheduleCubeComponent', () => {
  let component: ScheduleCubeComponent;
  let fixture: ComponentFixture<ScheduleCubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleCubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
