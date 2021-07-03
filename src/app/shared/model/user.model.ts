import { MessageSettings } from '../../dashboard/message/MessageSettings.model';

export class UserModel {
  id: number;
  role_id: number;
  name: string;
  phone: string;
  email: string;
  tutorials: string[];
  messageSettings: MessageSettings;
  wallet: WalletModel;
  notificationCount: number;
  created_at: string;
  email_verified: string;
}

export class WalletModel {
  money: number;
}

