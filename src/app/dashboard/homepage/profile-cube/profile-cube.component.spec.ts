import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCubeComponent } from './profile-cube.component';

describe('ProfileCubeComponent', () => {
  let component: ProfileCubeComponent;
  let fixture: ComponentFixture<ProfileCubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
