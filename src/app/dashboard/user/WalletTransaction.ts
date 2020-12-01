export enum WalletTransactionTypes {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT'
};

export class WalletTransaction {
  // tslint:disable-next-line: variable-name
  created_at: string;
  id: number;
  money: number;
  type: WalletTransactionTypes;
}
