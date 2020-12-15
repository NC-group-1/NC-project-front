import {UserDataModel} from './UserDataModel';
import {Parameter} from './parameter';
import {DataSetGeneralInfoDto} from './data-set-general-info-dto';

export class Dataset {
  id: number;
  name: string;
  description: string;
  creator: UserDataModel;
  parameters: Parameter[];
  constructor(dataset: DataSetGeneralInfoDto) {
    this.id = dataset.id;
    this.name = dataset.name;
    this.description = dataset.description;
    this.creator = {
      id: dataset.createdById,
      name: dataset.createdByName,
      surname: dataset.createdBySurname,
      role: dataset.createdByRole
    };
  }
}
