import {ProjectModel} from './ProjectModel';
import {UserDataModel} from './UserDataModel';

export class ScenarioModel{
  testScenarioId?: number;
  name: string;
  description: string;
  user?: UserDataModel;
  project?: ProjectModel;
  listActionCompoundId?: number[];
  // actions?: ActionInstanceModel[];
}
