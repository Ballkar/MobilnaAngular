import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeCubeComponent } from './welcome-cube.component';

describe('WelcomeCubeComponent', () => {
  let component: WelcomeCubeComponent;
  let fixture: ComponentFixture<WelcomeCubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeCubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
