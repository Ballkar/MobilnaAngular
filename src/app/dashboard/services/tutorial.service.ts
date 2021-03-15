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

  constructor(
    private guidedTourService: GuidedTourService,
    private http: HttpClient,
    private userService: UserService,
  ) {

  }

  startBaseTutorial() {
    this.guidedTourService.startTour(this.baseTour);
  }

  private baseTutorialCompleted() {
    this.tutorialCompleteHttp(this.baseTour.tourId).subscribe(console.log);
  }

  private tutorialCompleteHttp(tutorial: string): Observable<any> {
    return this.http.post<ResponseModel<UserModel>>(`${environment.apiUrl}/user/tutorial`, {tutorial}).pipe(
      map(res => res.data),
      tap(user => this.userService.loggedUser = user),
    );
  }
}
