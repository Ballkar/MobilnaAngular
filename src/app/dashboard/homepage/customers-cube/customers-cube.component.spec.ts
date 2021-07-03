import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersCubeComponent } from './customers-cube.component';

describe('CustomersCubeComponent', () => {
  let component: CustomersCubeComponent;
  let fixture: ComponentFixture<CustomersCubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersCubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
