export class RemindPlanModel {
  active: boolean;
  body: MessageSchemaBodyModel[];
  clearDiacritics: boolean;
  hour: number;
  minute: number;
  id: number;
  timeType: typeof TIMETYPES;
}


export const TIMETYPES = {
  sameDay: '1',
  dayBefore: '2',
};

export interface MessageSchemaBodyModel {
  variable?: string;
  model?: string;
  text?: string;
  type: SCHEMABODYTYPES;
}

export enum SCHEMABODYTYPES {VARIABLE = 'VARIABLE', TEXT = 'TEXT'}
