import { CustomerModel } from '../customers/customer.model';


export const TIMETYPES = {
  sameDay: '1',
  dayBefore: '2',
};

export interface MessageSchemaModel {
  id: number;
  name: string;
  text: string;
}

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
