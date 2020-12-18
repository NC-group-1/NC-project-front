import {ProjectModel} from './ProjectModel';
import {UserModel} from './UserModel';
import {UserDataModel} from './UserDataModel';
import {ScenarioModel} from './TestScenario';
import {TimeInterval} from 'rxjs';
import {ActionInstanceModel} from './ActionInstanceModel';

export class TestCaseModel{
  testCaseId?: number;
  user: { id: number, name?: string, surname?: string, email?: string };
  starter?: UserDataModel;
  testScenarioId?: number;
  actions?: ActionInstanceModel[];
  name: string;
  role?: string;
  description: string;
  creationDate?: Date;
  startDate?: Date;
  finishDate?: Date;
  status?: string;
  //recurringTime?: TimeInterval<Date>;
  recurringTime?: string;
  iterationsAmount?: number;
  watcher_numb?: number;
  edit?: boolean;
}
