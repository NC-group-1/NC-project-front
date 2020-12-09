import {ProjectModel} from './ProjectModel';
import {UserModel} from './UserModel';
import {UserDataModel} from './UserDataModel';
import {ScenarioModel} from './TestScenario';
import {TimeInterval} from 'rxjs';
import {ActionInstanceModel} from './ActionInstanceModel';

export class TestCaseModel{
  id?: number;
  creatorId: number;
  starter?: UserDataModel;
  test_scenario_id?: number;
  actions?: ActionInstanceModel[];
  name: string;
  role?: string;
  description: string;
  creationTime?: Date;
  startDate?: Date;
  finishDate?: Date;
  status?: string;
  recurringTime?: TimeInterval<Date>;
  iterationsAmount?: number;
}
