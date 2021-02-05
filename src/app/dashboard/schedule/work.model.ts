import { CustomerModel } from '../customers/customer.model';

export interface WorkModel {
  id: number;
  start: string;
  stop: string;
  customer: CustomerModel;
  customer_id?: number;
}


export enum WorkTypes { CLIENT }
