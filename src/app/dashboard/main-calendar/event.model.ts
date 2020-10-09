import { StateModel } from './state.model';

export interface EventModel<T> {
  start: string;
  stop: string;
  title: string;
  data: T;
  state: StateModel;
}
