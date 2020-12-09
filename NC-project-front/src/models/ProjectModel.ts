import {UserModel} from './UserModel';

export class ProjectModel{
  id?: number;
  name?: string;
  link?: string;
  date?: Date;
  role?: string;
  // user_id?: number;
  user?: UserModel;
  archived?: boolean;
  edit?: boolean;
}
