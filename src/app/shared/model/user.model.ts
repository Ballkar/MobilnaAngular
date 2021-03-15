import { MessageSettings } from '../../dashboard/message/MessageSettings.model';

export class UserModel {
  id: number;
  name: string;
  phone: string;
  email: string;
  tutorials: string[];
  messageSettings: MessageSettings;
  wallet: WalletModel;
  notificationCount: number;
}

export class WalletModel {
  money: number;
}

