// tslint:disable: variable-name

export enum NotificationTypes { INFO = 'INFO', WARNING = 'WARNING', ERROR = 'ERROR' }

export class NotificationModel {
  title: string;
  message: string;
  user_id: number;
  is_read: boolean;
  created_at: string;
  type: NotificationTypes;
}
