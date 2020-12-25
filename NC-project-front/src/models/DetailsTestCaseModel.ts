import {UserDataModel} from './UserDataModel';
import {ProjectModel} from './ProjectModel';
import {ActionInstRun} from './ActionInstRun';

export class DetailsTestCaseModel{
  id?: number;
  name?: string;
  creator?: UserDataModel;
  starter?: UserDataModel;
  status?: string;
  startDate?: string;
  finishDate?: string;
  project?: ProjectModel;
  actionInstRunDtos?: ActionInstRun[];
  watchers?: UserDataModel[];
  testScenarioId?: number;
}
