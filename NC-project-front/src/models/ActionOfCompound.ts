import {Action} from './action';
import {ParameterKey} from './parameter-key';

export class ActionOfCompound{
  action: Action;
  orderNum: number;
  parameterKey: ParameterKey;
  compoundActions?: any;
}
