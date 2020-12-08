import {UserModel} from './UserModel';

export class ProjectModel{
  projectId?: number;
  name?: string;
  link?: string;
  date?: Date;
  role?: string;
  user: UserModel;
  archived?: boolean;
  edit?: boolean;
}
