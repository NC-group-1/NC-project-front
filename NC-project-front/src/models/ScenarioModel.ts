import {ActionOfCompound} from './ActionOfCompound';

export class ScenarioModel{
  id?: number;
  name: string;
  description: string;
  user_id?: number;
  project_id?: number;
  actions?: ActionOfCompound[];
}
