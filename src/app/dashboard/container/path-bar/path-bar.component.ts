import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-path-bar',
  templateUrl: './path-bar.component.html',
  styleUrls: ['./path-bar.component.scss']
})
export class PathBarComponent implements OnInit, OnDestroy {

  basePath: {url: string, name: string} = {
    url: '/dashboard/home',
    name: 'Strona Główna'
  };
  pathsAvailable: {url: string, name: string}[] = [
    {
      url: '/dashboard/work',
      name: 'Kalendarz'
    },
    {
      url: '/dashboard/message/plans',
      name: 'Plany wiadomości'
    },
    {
      url: '/dashboard/message/history',
      name: 'Historia SMS'
    },
    {
      url: '/dashboard/customer/list',
      name: 'Lista Klientek'
    },
    {
      url: '/dashboard/workers/list',
      name: 'Lista Pracowników'
    },
    {
      url: '/dashboard/profile',
      name: 'Profil'
    },
    {
      url: '/dashboard/profile/wallet',
      name: 'Portfel'
    },
  ];
  path: {url: string, name: string}[];
  private onDestroy$: Subject<void> = new Subject();
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.path = [this.findPathByUrl(this.router.url)];
    this.router.events.pipe(
      takeUntil(this.onDestroy$),
      filter(r => r instanceof NavigationEnd),
    ).subscribe((r: NavigationEnd) => this.path = [this.findPathByUrl(r.urlAfterRedirects)])
  }

  findPathByUrl(urlAfterRedirects: string): {url: string, name: string} {
    return this.pathsAvailable.find(path => path.url === urlAfterRedirects);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
