import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-test-case',
  templateUrl: './test-case.component.html',
  styleUrls: ['./test-case.component.css']
})
export class TestCaseComponent implements OnInit {

  datasets = [
    {id: 1, name: 'Dataset1', description: 'Dataset', creator: {id: 1, email: 'quantum13man@gmail.com'}, parameters: [{id: 1, key: 'First Parameter'}, {id: 2, key: 'Second Parameter', value: 'Some value'}, {id: 3, key: 'Third Parameter', value: null}]},
    {id: 2, name: 'Dataset2', description: 'Dataset', creator: {id: 13, email: 'clayn130@gmail.com'}, parameters: [{id: 1, key: 'First Parameter'}, {id: 2, key: 'Second Parameter', value: 'Some value'}, {id: 3, key: 'Third Parameter', value: null}]}
    ];

  constructor() {
  }

  ngOnInit(): void {
  }

  showDatasets() {
    $('#datasetModal').modal('show');
  }
}
