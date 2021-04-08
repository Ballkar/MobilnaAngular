import { CustomerModel } from '../customers/customer.model';
import { WorkerModel } from './worker.model';

export interface WorkModel {
  id: number;
  start: string;
  stop: string;
  customer: CustomerModel;
  customer_id?: number;
  worker: WorkerModel;
  worker_id?: number;
}


export enum WorkTypes { CLIENT }
