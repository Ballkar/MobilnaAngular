export interface EventMainCalendar<T> {
  start: string;
  stop: string;
  title: string;
  data: T;
  color: string;
  draggable: boolean;
}
