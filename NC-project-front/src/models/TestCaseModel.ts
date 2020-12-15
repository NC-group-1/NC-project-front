export class TestCaseModel{
  id?: number;
  creator?: number;
  starter_id?: number;
  //tesc_scenario_id?: TestScenario;
  name?: string;
  creationDate?: Date;
  startDate?: Date;
  finish_date?: Date;
  status?: string;
  description?: string;
  recurringTime?: String;
  iterationsAmount?: number;
  watcher_numb?: number;
  edit?: boolean;
}
