import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidemenuElements: SidemenuElement[] = [
    {
      icon: 'assignment_ind',
      navigateTo: ['/', 'dashboard', 'customer'],
      title: 'Klientki',
      active: false,
    },
    {
      icon: 'sms',
      navigateTo: ['/', 'dashboard', 'message'],
      title: 'Wiadomości',
      active: false,
      child: [
        {
          icon: 'sms',
          navigateTo: ['/', 'dashboard', 'message', 'plans'],
          title: 'Plany SMS',
          active: false,
        },
        {
          icon: 'history',
          navigateTo: ['/', 'dashboard', 'message', 'history'],
          title: 'Historia',
          active: false,
        },
      ]
    },
    {
      icon: 'work',
      navigateTo: ['/', 'dashboard', 'work'],
      title: 'Wizyty',
      active: false,
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}


interface SidemenuElement {
  icon: string;
  title: string;
  navigateTo: string[];
  active: boolean;
  child?: SidemenuElement[];
}
