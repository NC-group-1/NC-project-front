import {ProjectModel} from './ProjectModel';
import {UserModel} from './UserModel';
import {UserDataModel} from './UserDataModel';
import {ScenarioModel} from './TestScenario';
import {TimeInterval} from 'rxjs';

export class TestCaseModel{
  id?: number;
  project?: ProjectModel;
  creator?: UserDataModel;
  starter?: UserDataModel;
  testScenario?: ScenarioModel;
  name: string;
  description: string;
  creationTime?: Date;
  startDate?: Date;
  finishDate?: Date;
  status?: string;
  recurringTime?: TimeInterval<Date>;
  iterationsAmount?: number;
}
