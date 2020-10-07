import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  open = false;
  opened$: Subject<boolean> = new Subject<boolean>();

  constructor(
  ) { }

  toggle() {
    this.open = !this.open;
    this.opened$.next(this.open);
  }
}
