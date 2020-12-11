import {UserDataModel} from "./UserDataModel";

export class ProjectModel{
  projectId?: number;
  name?: string;
  link?: string;
  date?: Date;
  role?: string;
  user?: UserDataModel;
  archived?: boolean;
  edit?: boolean;
}
