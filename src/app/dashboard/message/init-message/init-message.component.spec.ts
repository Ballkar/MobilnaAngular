import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitMessageComponent } from './init-message.component';

describe('InitMessageComponent', () => {
  let component: InitMessageComponent;
  let fixture: ComponentFixture<InitMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
