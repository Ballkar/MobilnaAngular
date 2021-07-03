import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { Subject } from 'rxjs';
import { UserModel } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss']
})
export class UserPopupComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject();
  constructor(
    private notifyService: SnotifyService,
    private dialogRef: MatDialogRef<UserPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserModel,
  ) { }

  ngOnInit() {
  }

  save() {

  }

  close(res: any) {
    this.dialogRef.close(res);
  }

  closeAfterRemove() {
    this.dialogRef.close(true);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
