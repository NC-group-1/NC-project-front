import {Action} from './action';
import {Dataset} from './Dataset';
import {ParameterKey} from './parameter-key';

export class ActionInstanceModel{
  id?: number;
  action: Action;
  orderNum: number;
  datasetId: number;
  parameterKey?: ParameterKey;
  value?: any;
  dataset?: string;
}
