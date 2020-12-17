import {DataSetGeneralInfoDto} from "./data-set-general-info-dto";
import {UserDataModel} from "./UserDataModel";
import {ProjectModel} from "./ProjectModel";

export class DetailsTestCaseModel{
  id: number;
  name: string;
  creator: UserDataModel;
  starter: UserDataModel;
  status: string;
  startDate: string;
  finishDate: string;
  project: ProjectModel;
  watchers: UserDataModel[];
}
