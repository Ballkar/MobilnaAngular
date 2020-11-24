import { CustomerModel } from '../customers/customer.model';


export const TIMETYPES = {
  sameDay: '1',
  dayBefore: '2',
};

export interface MessageSchemaModel {
  id: number;
  name: string;
  body: MessageSchemaBodyModel[];
}
export interface MessageSchemaBodyModel {
  variable?: string;
  model?: string;
  text?: string;
  type: SCHEMABODYTYPES;
}

export enum SCHEMABODYTYPES {VARIABLE = 'VARIABLE', TEXT = 'TEXT'}

export interface MessageModel {
  id: number;
  name: string;
  text: string;
  customer: CustomerModel;
  created_at: string;
}

export interface MessagePlan {
  id: number;
  hour: number;
  minute: number;
  active: number;
  created_at: string;
  schema: MessageSchemaModel;
  timeType: typeof TIMETYPES;
}
