import { MessageSettings } from '../../dashboard/message/MessageSettings.model';

export class UserModel {
  id: number;
  name: string;
  phone: string;
  email: string;
  // avatar: string;
  messageSettings: MessageSettings;
  wallet: WalletModel;
  notificationCount: number;
  tutorialComplete: boolean;
}

export class WalletModel {
  money: number;
}

