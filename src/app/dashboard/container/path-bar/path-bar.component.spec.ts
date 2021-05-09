import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathBarComponent } from './path-bar.component';

describe('PathBarComponent', () => {
  let component: PathBarComponent;
  let fixture: ComponentFixture<PathBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
