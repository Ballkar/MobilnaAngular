import { Injectable } from '@angular/core';
import { StateModel } from '../main-calendar/state.model';

@Injectable({
  providedIn: 'root'
})
export class WorkService {


  clientState: StateModel = {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  };
  constructor() { }
}
