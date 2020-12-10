import {UserDataModel} from "./UserDataModel";

export class ProjectModel{
  id?: number;
  name?: string;
  link?: string;
  date?: Date;
  role?: string;
  // user_id?: number;
  user?: UserDataModel;
  archived?: boolean;
  edit?: boolean;
}
