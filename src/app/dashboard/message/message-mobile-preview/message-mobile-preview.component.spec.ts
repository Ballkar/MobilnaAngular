import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageMobilePreviewComponent } from './message-mobile-preview.component';

describe('MessageMobilePreviewComponent', () => {
  let component: MessageMobilePreviewComponent;
  let fixture: ComponentFixture<MessageMobilePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageMobilePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageMobilePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
