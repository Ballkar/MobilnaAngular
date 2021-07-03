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
      id: 'works',
      icon: 'work',
      navigateTo: ['/', 'dashboard', 'work'],
      title: 'Wizyty',
      active: false,
    },
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
      title: 'Historia SMS',
      active: false,
    },
    {
      id: 'customer',
      icon: 'assignment_ind',
      navigateTo: ['/', 'dashboard', 'customer', 'list'],
      title: 'Klientki',
      active: false,
    },
    {
      id: 'workers',
      icon: 'people',
      navigateTo: ['/', 'dashboard', 'workers', 'list'],
      title: 'Pracownicy',
      active: false,
    }
  ];

  constructor(
  ) {
    this.opened$.subscribe(res => this.open = res)
  }

  toggle() {
    this.opened$.next(!this.open);
  }
}
