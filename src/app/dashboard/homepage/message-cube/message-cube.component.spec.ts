import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCubeComponent } from './message-cube.component';

describe('MessageCubeComponent', () => {
  let component: MessageCubeComponent;
  let fixture: ComponentFixture<MessageCubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageCubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
