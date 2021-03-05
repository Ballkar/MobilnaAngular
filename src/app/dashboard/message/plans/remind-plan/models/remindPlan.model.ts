export class RemindPlanModel {
  active: boolean;
  body: PlanBodyModel[];
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

export interface PlanBodyModel {
  variable?: {
    model: string,
    name: string,
  };
  text?: string;
  type: PLANBODYTYPES;
}

export enum PLANBODYTYPES {VARIABLE = 'VARIABLE', TEXT = 'TEXT'}
