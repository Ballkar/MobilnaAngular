import { MessageSettings } from '../../dashboard/message/MessageSettings.model';

export class UserModel {
  id: number;
  name: string;
  phone: string;
  email: string;
  messageSettings: MessageSettings;
}


