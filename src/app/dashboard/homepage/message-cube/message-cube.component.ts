import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { filter } from 'rxjs/operators';
import { InitMessagePopupComponent } from '../../message/init-message-popup/init-message-popup.component';
import { MessageModel } from '../../message/message.model';

@Component({
  selector: 'app-message-cube',
  templateUrl: './message-cube.component.html',
  styleUrls: ['./message-cube.component.scss']
})
export class MessageCubeComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private notifierService: SnotifyService,
  ) { }

  ngOnInit(): void {
  }

  sendMessage() {
    const ref = this.dialog.open(InitMessagePopupComponent, {data: {}});
    ref.afterClosed().pipe(
      filter((data: MessageModel) => !!data)
    ).subscribe(
      () => this.notifierService.success('Wiadomość została wysłana!'),
      () => this.notifierService.error('Problem podczas wysyłki sms'),
    );
  }
}
