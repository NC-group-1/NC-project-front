import {ParameterKey} from './parameter-key';
import {ActionInstanceModel} from './ActionInstanceModel';

export class Action {
  id?: number;
  name: string;
  description?: string;
  type: string;
  parameterKey?: ParameterKey;
  actions?: ActionInstanceModel[];
}
