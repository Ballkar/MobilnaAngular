import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerCubeComponent } from './worker-cube.component';

describe('WorkerCubeComponent', () => {
  let component: WorkerCubeComponent;
  let fixture: ComponentFixture<WorkerCubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerCubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
