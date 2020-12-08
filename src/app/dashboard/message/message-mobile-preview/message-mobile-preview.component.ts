import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message-mobile-preview',
  templateUrl: './message-mobile-preview.component.html',
  styleUrls: ['./message-mobile-preview.component.scss']
})
export class MessageMobilePreviewComponent implements OnInit {

  @Input() from: string;
  @Input() text: string;
  @Input() smsCount: number;
  @Input() letterCount: number;
  @Input() letterNextLimit: number;
  @Output() backClicked: EventEmitter<void> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  close() {
    this.backClicked.emit();
  }
}
