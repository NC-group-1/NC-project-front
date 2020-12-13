import {UserDataModel} from './UserDataModel';
import {NotificationModel} from './NotificationModel';

export class UserNotificationModel {
  notification: NotificationModel;
  isRead: boolean;
  watcher: UserDataModel;
}
