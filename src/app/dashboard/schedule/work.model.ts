import { CustomerModel } from '../customers/customer.model';
import { LabelModel } from './label.model';

export interface WorkModel {
  id: number;
  start: string;
  stop: string;
  customer: CustomerModel;
  customer_id?: number;
  label: LabelModel;
  label_id?: number;
}


export enum WorkTypes { CLIENT }
