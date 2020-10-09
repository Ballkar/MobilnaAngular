import { Injectable } from '@angular/core';
import { StateModel } from 'src/app/dashboard/main-calendar/state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  states: StateModel;
  constructor() { }
}
