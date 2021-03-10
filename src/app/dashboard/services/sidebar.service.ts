import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SidemenuElement } from '../container/sidebar/SidemenuElement.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  open = false;
  opened$: Subject<boolean> = new Subject<boolean>();
  sidemenuElements: SidemenuElement[] = [
    {
      id: 'customer',
      icon: 'assignment_ind',
      navigateTo: ['/', 'dashboard', 'customer'],
      title: 'Klientki',
      active: false,
    },
    {
      id: 'message_container',
      icon: 'sms',
      navigateTo: ['/', 'dashboard', 'message'],
      title: 'Wiadomości',
      active: false,
      child: [
        {
          id: 'message_plans',
          icon: 'sms',
          navigateTo: ['/', 'dashboard', 'message', 'plans'],
          title: 'Plany SMS',
          active: false,
        },
        {
          id: 'message_history',
          icon: 'history',
          navigateTo: ['/', 'dashboard', 'message', 'history'],
          title: 'Historia',
          active: false,
        },
      ]
    },
    {
      id: 'works',
      icon: 'work',
      navigateTo: ['/', 'dashboard', 'work'],
      title: 'Wizyty',
      active: false,
    }
  ];

  constructor(
  ) { }

  toggle() {
    this.open = !this.open;
    this.opened$.next(this.open);
  }
}
