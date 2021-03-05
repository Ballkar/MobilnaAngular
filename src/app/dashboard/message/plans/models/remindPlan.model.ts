export class RemindPlanModel {
  active: boolean;
  body: MessageSchemaBodyModel[];
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

export interface MessageSchemaBodyModel {
  variable?: {
    model: string,
    name: string,
  };
  model?: string;
  text?: string;
  type: SCHEMABODYTYPES;
}

export enum SCHEMABODYTYPES {VARIABLE = 'VARIABLE', TEXT = 'TEXT'}
