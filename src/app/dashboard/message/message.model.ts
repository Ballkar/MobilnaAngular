import { CustomerModel } from '../customers/customer.model';

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

export interface MessagePlans {
  id: number;
  hour: number;
  minute: number;
  dayBefore: number;
  sameDay: number;
  active: number;
  created_at: string;
  schema: MessageSchemaModel;
}
