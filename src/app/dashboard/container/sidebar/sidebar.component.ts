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
          icon: 'history',
          navigateTo: ['/', 'dashboard', 'message', 'history'],
          title: 'Historia',
          active: false,
        },
        {
          icon: 'question_answer',
          navigateTo: ['/', 'dashboard', 'message', 'schema'],
          title: 'Schematy',
          active: false,
        },
        {
          icon: 'schedule',
          navigateTo: ['/', 'dashboard', 'message', 'plan'],
          title: 'Planowanie',
          active: false,
        },
        {
          icon: 'schedule',
          navigateTo: ['/', 'dashboard', 'message', 'plans'],
          title: 'Plany Kosmetyczki',
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
