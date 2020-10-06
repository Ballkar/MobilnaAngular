import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  open = false;
  opened$ = new BehaviorSubject<boolean>(this.open);

  constructor(
  ) { }

  toggle() {
    this.open = !this.open;
    this.opened$.next(this.open);
  }
}
