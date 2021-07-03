import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SidemenuElement } from '../container/sidebar/SidemenuElement.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  open: boolean;
  opened$: Subject<boolean> = new Subject<boolean>();
  sidemenuElements: SidemenuElement[] = [
    {
      id: 'users',
      icon: 'assignment_ind',
      navigateTo: ['/', 'admin', 'users'],
      title: 'Userzy',
      active: false,
    },
    {
      id: 'message_container',
      icon: 'sms',
      navigateTo: ['/', 'admin', 'message'],
      title: 'Wiadomości',
      active: false,
      child: [
        {
          id: 'plany',
          icon: 'sms',
          navigateTo: ['/', 'admin', 'message', 'plans'],
          title: 'Plany SMS',
          active: false,
        },
      ]
    },
  ];

  constructor(
  ) {
    this.opened$.subscribe(res => this.open = res)
  }

  toggle() {
    this.opened$.next(!this.open);
  }
}
