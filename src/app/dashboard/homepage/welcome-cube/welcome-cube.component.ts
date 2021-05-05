import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/shared/model/user.model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-welcome-cube',
  templateUrl: './welcome-cube.component.html',
  styleUrls: ['./welcome-cube.component.scss']
})
export class WelcomeCubeComponent implements OnInit {

  user: UserModel = this.authServie.loggedUser;
  constructor(
    private authServie: UserService,
  ) { }

  ngOnInit(): void {
  }

}
