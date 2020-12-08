export const testDatasets = [
  {
    id: 1,
    name: 'Dataset1',
    description: 'Dataset',
    creator: {id: 1, email: 'quantum13man@gmail.com'},
    parameters: [{id: 1, key: 'First Parameter', value: '1st Value'}, {
      id: 2,
      key: 'Second Parameter',
      value: 'Some value'
    }, {
      id: 3,
      key: 'Third Parameter',
      value: 15
    }]
  },
  {
    id: 2,
    name: 'Dataset2',
    description: 'Dataset',
    creator: {id: 13, email: 'clayn130@gmail.com'},
    parameters: [{id: 1, key: 'Fourth Parameter'}, {id: 2, key: 'Fifth Parameter', value: 'Some Dataset 2 value'}, {
      id: 3,
      key: 'Sixth Parameter',
      value: 18
    }]
  },
  {
    id: 3,
    name: 'Dataset3',
    description: 'Dataset',
    creator: {id: 13, email: 'clayn130@gmail.com'},
    parameters: [
      {id: 1, key: 'Fourth Parameter'},
      {id: 2, key: 'Fifth Parameter', value: 'Some Dataset 3 value'},
      {id: 3, key: 'Sixth Parameter', value: 108}
    ]
  },
  {
    id: 4,
    name: 'Dataset4',
    description: 'Dataset',
    creator: {id: 13, email: 'clayn130@gmail.com'},
    parameters: [{id: 1, key: 'Fourth Parameter'}, {id: 2, key: 'Fifth Parameter', value: 'Some Dataset 4 value'}, {
      id: 3,
      key: 'Sixth Parameter',
      value: 8213
    }]
  },
  {
    id: 5,
    name: 'Dataset5',
    description: 'Dataset',
    creator: {id: 13, email: 'clayn130@gmail.com'},
    parameters: [{id: 1, key: 'Fourth Parameter'}, {id: 2, key: 'Fifth Parameter', value: 'Some Dataset 5 value'}, {
      id: 3,
      key: 'Sixth Parameter',
      value: 82222222234
    }]
  },
  {
    id: 6,
    name: 'Dataset6',
    description: 'Dataset',
    creator: {id: 13, email: 'clayn130@gmail.com'},
    parameters: [{id: 1, key: 'Fourth Parameter'}, {id: 2, key: 'Fifth Parameter', value: 'Some Dataset 6 value'}, {
      id: 3,
      key: 'Sixth Parameter',
      value: 857665
    }]
  },
  {
    id: 7,
    name: 'Dataset7',
    description: 'Dataset',
    creator: {id: 13, email: 'clayn130@gmail.com'},
    parameters: [{id: 1, key: 'Fourth Parameter'}, {id: 2, key: 'Fifth Parameter', value: 'Some Dataset 7 value'}, {
      id: 3,
      key: 'Sixth Parameter',
      value: 8
    }]
  },
  {
    id: 8,
    name: 'Dataset8',
    description: 'Dataset',
    creator: {id: 13, email: 'clayn130@gmail.com'},
    parameters: [{id: 1, key: 'Fourth Parameter'}, {id: 2, key: 'Fifth Parameter', value: 'Some value'}, {
      id: 3,
      key: 'Sixth Parameter',
      value: 8
    }]
  }
];
export const testActions = [
  {
    action: {name: 'Action 1', type: 'FIND_ELEMENT_BY_ID'},
    dataset: null,
    value: null,
    orderNum: 1,
    key: {key: 'Sixth Parameter'}
  },
  {
    action: {name: 'Action 2', type: 'FIND_ELEMENT_BY_ID'},
    dataset: null,
    value: null,
    orderNum: 2,
    key: {key: 'Fifth Parameter'}
  },
  {
    action: {name: 'Action 3', type: 'FIND_ELEMENT_BY_ID'},
    dataset: null,
    value: null,
    orderNum: 3,
    key: {key: 'Third Parameter'}
  },
  {
    action: {name: 'Action 4', type: 'FIND_ELEMENT_BY_ID'},
    dataset: null,
    value: null,
    orderNum: 4,
    key: {key: 'First Parameter'}
  },
  {
    action: {name: 'Action 5', type: 'FIND_ELEMENT_BY_ID'},
    dataset: null,
    value: null,
    orderNum: 5,
    key: {key: 'Fourth Parameter'}
  },
  {
    action: {name: 'Action 6', type: 'FIND_ELEMENT_BY_ID'},
    dataset: null,
    value: null,
    orderNum: 6,
    key: {key: 'First Parameter'}
  },
  {
    action: {name: 'Action 7', type: 'FIND_ELEMENT_BY_ID'},
    dataset: null,
    value: null,
    orderNum: 7,
    key: {key: 'Second Parameter'}
  }
];
