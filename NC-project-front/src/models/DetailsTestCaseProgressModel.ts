import {DataSetGeneralInfoDto} from './data-set-general-info-dto';

export class DetailsTestCaseProgressModel{
  testCaseId: number;
  name: string;
  dataset: DataSetGeneralInfoDto;
  result: string;
  status: string;
  progress: number;
}
