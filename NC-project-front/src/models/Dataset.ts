import {UserDataModel} from './UserDataModel';
import {ParameterKey} from './parameter-key';

export class Dataset {
  id: number;
  name: string;
  description: string;
  creator: UserDataModel;
  parameters: ParameterKey[];
}
