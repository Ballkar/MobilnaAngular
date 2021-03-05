export class RemindPlanModel {
  active: boolean;
  body: PlanBodyModelElement[];
  clear_diacritics: boolean;
  hour: number;
  minute: number;
  id: number;
  time_type: typeof TIMETYPES;
}


export const TIMETYPES = {
  sameDay: '1',
  dayBefore: '2',
};

export interface PlanBodyModelElement {
  variable?: {
    model: string,
    name: string,
  };
  text?: string;
  type: PLANBODYTYPES;
}

export enum PLANBODYTYPES {VARIABLE = 'VARIABLE', TEXT = 'TEXT'}
