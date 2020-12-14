import {TestCaseModel} from './TestCaseModel';

export class NotificationModel {
  notificationId: number;
  testCase: TestCaseModel;
  date: Date;
  type: string;
}
