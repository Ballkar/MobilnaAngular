import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrientationConfiguration, Orientation, TourStep, GuidedTour, GuidedTourService } from 'ngx-guided-tour';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ResponseModel } from 'src/app/shared/model/response.model';
import { UserModel } from 'src/app/shared/model/user.model';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  config: OrientationConfiguration = {
    orientationDirection: Orientation.Center
  };
  baseTour: GuidedTour = {
    steps: [
      {
        content: 'Możesz w tym miejscu dodawać klientki',
        title: 'Klientki',
        selector: '#customer',
        orientation: Orientation.BottomRight,
        skipStep: false,
      },
      {
        content: 'Tutaj zaplanujesz wysyłkę SMS dla swoich klientek',
        title: 'Klientki',
        selector: '#message_plans',
        orientation: Orientation.BottomRight,
        skipStep: false,
      },
      {
        content: 'Tutaj znajdziesz historie wysłanych wiadomości SMS',
        title: 'Klientki',
        selector: '#message_history',
        orientation: Orientation.BottomRight,
        skipStep: false,
      },
      {
        content: 'Widok Twojego kalendarza pozwoli zoorganizować wizyty w jednym miejscu',
        title: 'Wizyty',
        selector: '#works',
        orientation: Orientation.BottomRight,
        skipStep: false,
      },
      {
        content: 'Tutaj możesz zarządzać swoimi pracownikami',
        title: 'Pracownicy',
        selector: '#workers',
        skipStep: false,
      },
      {
        content: `W tym miejscu widzisz swój aktualną ilość pieniędzy w portfelu. <br> Pamiętaj że jeżeli stan konta spadnie poniżej zera smsy nie zostaną wysłane`,
        title: 'Stan konta',
        selector: '#navTutorial',
        orientation: Orientation.BottomRight,
        skipStep: false,
      },
      {
        content: `Właśnie ukończyłaś wprowadzenie do aplikacji. <br>
        Poznanie reszty funkcji zajmie tyle co wypicie kawy.`,
        title: 'Świetnie!',
        orientation: Orientation.Center,
        skipStep: false,
      },
    ],
    tourId: 'base_v1',
    completeCallback: () => this.baseTutorialCompleted(),
  }

  messageTour: GuidedTour = {
    steps: [
      {
        title: 'Plany SMS',
        content: 'Tutaj możesz zaplanować w jaki sposób komunikujemy się z Twoimi klientkami',
        skipStep: false,
      },
      {
        content: 'Każdy plan posiada inne przeznaczenie oraz inne zachowanie',
        title: 'Plany',
        selector: '#plansContainer',
        skipStep: false,
      },
      {
        content: 'Całość zachowania planu zobaczysz w jego szczegółach',
        title: 'Szczegóły',
        selector: '.btnsContainer',
        skipStep: false,
      },
    ],
    tourId: 'message_plans_v1',
    completeCallback: () => this.messageTutorialCompleted(),
  }

  messageDetailTour: GuidedTour = {
    steps: [
      {
        title: 'Szczegóły',
        content: 'Tutaj planujesz sposób realizacji planu',
        skipStep: false,
      },
      {
        title: 'Schemat',
        content: 'Określa treść wiadomości',
        selector: '#schema',
        skipStep: false,
      },
      {
        title: 'Zmienne',
        content: 'W treść wiadomości możesz wrzucać zmienne takie jak Imie klientki, a my w to miejsce wrzucimy wartość dla konkretnego przypadku.',
        selector: '#addVariableTutorial',
        skipStep: false,
      },
      {
        title: 'Podgląd',
        content: 'Aby się upewnić zobacz jak wygląda treść wiadomość na przykładzie konkretnej klientki.',
        selector: '.previewBtn',
        skipStep: false,
      },
    ],
    tourId: 'message_detail_plans_v1',
    completeCallback: () => this.messageDetailTutorialCompleted(),
  }

  scheduleTour: GuidedTour = {
    steps: [
      {
        title: 'Kalendarz',
        content: 'Widzisz tutaj wszystkie swoje nadchodzące wizyty oraz ich historie',
        skipStep: false,
      },
      {
        title: 'Pracownicy',
        content: 'Do każdej wizyty możesz przypisać pracownika, co pomoże Ci w organizacji pracy.',
        selector: '#worker_tutorial',
        orientation: Orientation.Bottom,
        skipStep: false,
      },
      {
        title: 'Wizyty',
        content: 'Wizyty możesz dodawać poprzez zwykłe kliknięcie w miejsce w puste miejsce w kalendarzu',
        selector: '#schedule_tutorial',
        skipStep: false,
      },
    ],
    tourId: 'schedule_v1',
    completeCallback: () => this.scheduleTutorialCompleted(),
  }

  constructor(
    private guidedTourService: GuidedTourService,
    private http: HttpClient,
    private userService: UserService,
  ) {

  }

  startBaseTutorial() {
    this.guidedTourService.startTour(this.baseTour);
  }

  startMessageTutorial() {
    this.guidedTourService.startTour(this.messageTour);
  }

  startMessageDetailTutorial() {
    this.guidedTourService.startTour(this.messageDetailTour);
  }

  startScheduleTutorial() {
    document.querySelector('#worker_tutorial').scrollTo(0,0);
    document.querySelector('body').scrollTo(0,0);
    this.guidedTourService.startTour(this.scheduleTour);
  }

  private baseTutorialCompleted() {
    this.tutorialCompleteHttp(this.baseTour.tourId).subscribe();
  }

  private messageTutorialCompleted() {
    this.tutorialCompleteHttp(this.messageTour.tourId).subscribe();
  }

  private messageDetailTutorialCompleted() {
    this.tutorialCompleteHttp(this.messageDetailTour.tourId).subscribe();
  }

  private scheduleTutorialCompleted() {
    this.tutorialCompleteHttp(this.scheduleTour.tourId).subscribe();
  }

  private tutorialCompleteHttp(tutorial: string): Observable<any> {
    return this.http.post<ResponseModel<UserModel>>(`${environment.apiUrl}/user/tutorial`, {tutorial}).pipe(
      map(res => res.data),
      tap(user => this.userService.loggedUser = user),
    );
  }
}
