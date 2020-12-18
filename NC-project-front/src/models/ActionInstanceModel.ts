import {Action} from './action';
import {DatasetModel} from './DatasetModel';
import {ParameterKey} from './parameter-key';

export class ActionInstanceModel{
  id?: number;
  action: Action;
  orderNum: number;
  datasetId: number;
  compoundId?: number;
  parameterKey?: ParameterKey;
  value?: any;
  dataset?: string;
}
