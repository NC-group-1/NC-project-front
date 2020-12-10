import {ActionOfCompound} from './ActionOfCompound';
import {UserModel} from './UserModel';
import {ProjectModel} from './ProjectModel';
import {UserDataModel} from './UserDataModel';

export class ScenarioModel{
  id?: number;
  name: string;
  description: string;
  user? : UserDataModel;
  project? : ProjectModel;
  listActionCompoundId?: number[];
}
