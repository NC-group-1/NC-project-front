import {ProjectModel} from './ProjectModel';
import {UserModel} from './UserModel';
import {UserDataModel} from './UserDataModel';
import {ScenarioModel} from './TestScenario';
import {TimeInterval} from 'rxjs';
import {ActionInstanceModel} from './ActionInstanceModel';

export class TestCaseModel{
  id?: number;
  // testCaseId?: number;
  user: { userId: number, name?: string, surname?: string, email?: string };
  starter?: UserDataModel;
  testScenarioId?: number;
  actions?: ActionInstanceModel[];
  name: string;
  // role?: string;
  description: string;
  creationDate?: Date;
  startDate?: any;
  finishDate?: Date;
  status?: string;
  // recurringTime?: TimeInterval<Date>;
  recurringTime?: string;
  iterationsAmount?: number;
  watcherNumb?: number;
  edit?: boolean;
  testScenario?: number;
}
