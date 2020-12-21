export const apiPath = 'http://localhost:8081/';

export enum ActionType {
  CLICK = '{ "needParams": 0, "contextBehaviour": 0 }',
  SEND_KEYS = '{ "needParams": 2, "contextBehaviour": 0 }',
  SWITCH_TAB = '{ "needParams": 0, "contextBehaviour": 0 }',
  COMPARE_WITH_STRING = '{ "needParams": 2, "contextBehaviour": 0 }',
  COMPARE_WITH_CONTEXT_VALUE = '{ "needParams": 1, "contextBehaviour": 2 }',
  SCROLL_PAGE_TO_END = '{ "needParams": 0, "contextBehaviour": 0 }',
  SAVE_ELEMENT_TEXT_TO_CONTEXT = '{ "needParams": 1, "contextBehaviour": 1 }',
  SAVE_ELEMENT_ATTRIBUTE_TO_CONTEXT = '{ "needParams": 2, "contextBehaviour": 1 }',
  FIND_ELEMENT_BY_ID = '{"needParams":2,"contextBehaviour":0}',
  FIND_ELEMENT_BY_XPATH = '{ "needParams": 2, "contextBehaviour": 0 }',
  FIND_ELEMENT_BY_CLASS_NAME = '{ "needParams": 2, "contextBehaviour": 0 }',
  FIND_ELEMENT_BY_TAG_NAME = '{ "needParams": 2, "contextBehaviour": 0 }',
  FIND_ELEMENT_BY_NAME = '{ "needParams": 2, "contextBehaviour": 0 }',
  FIND_ELEMENT_BY_PARTIAL_LINK_TEXT = '{ "needParams": 2, "contextBehaviour": 0 }',
  FIND_ELEMENT_BY_LINK_TEXT = '{ "needParams": 2, "contextBehaviour": 0 }',
  FIND_ELEMENT_BY_CSS_SELECTOR = '{ "needParams": 2, "contextBehaviour": 0 }',
  COMPOUND = '{"needParams": 0, "contextBehaviour": 0 }'
}
export function getNeedParams(type: string): number{
  return JSON.parse(ActionType[type]).needParams;
}
