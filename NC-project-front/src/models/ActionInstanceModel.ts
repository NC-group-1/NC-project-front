import {Action} from './action';
import {Dataset} from './Dataset';
import {ParameterKey} from './parameter-key';

export class ActionInstanceModel{
  action: Action;
  orderNum: number;
  dataset: Dataset;
  key?: ParameterKey;
}
