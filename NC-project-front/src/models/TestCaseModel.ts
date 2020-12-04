export class TestCaseModel{
  test_case_id?: number;
  creator_id?: number;
  started_id?: number;
  //tesc_scenario_id?: TestScenario;
  name?: string;
  creation_date?: Date;
  start_date?: Date;
  finish_date?: Date;
  status?: string;
  description?: string;
  recurring_time?: String;
  iterations_amount?: number;
  edit?: boolean;
}
