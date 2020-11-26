import {Action} from './action';
import {ParameterKey} from './parameter-key';

export class CompoundModel{
  id?: number;
  name: string;
  description?: string;
  actions?: Action[];
  key?: ParameterKey;
}
