import { CustomerModel } from "../customers/customer.model";

export interface MessageModel {
  id: number;
  name: string;
  text: string;
  customer: CustomerModel;
  created_at: string;
}
