import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-info',
  templateUrl: './help-info.component.html',
  styleUrls: ['./help-info.component.scss']
})
export class HelpInfoComponent implements OnInit {
  @Input() message: string;
  constructor() { }

  ngOnInit() {
  }

}
