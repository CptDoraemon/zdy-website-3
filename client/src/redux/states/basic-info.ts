import cloneDeep from 'lodash/cloneDeep'

interface Data {
  [key: string]: string
}

export interface DefaultBasicInfoState {
  isDropdown: boolean,
  data: Data,
  defaultData: Data,
  displayNames: Data
}

const date = new Date();
const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const defaultData: Data = {
  'name': '',
  'sex': '',
  'age': '',
  'diseaseId': '',
  'id': '',
  'phone': '',
  'diagnose': '',
  'department': '',
  'sample': '',
  'applicationDate': dateString,
  'reportDate': dateString,
  'items': ''
};

const displayNames = {
  'name': '姓名',
  'sex': '性别',
  'age': '年龄',
  'diseaseId': '病理编号',
  'id': 'id',
  'phone': '电话',
  'diagnose': '诊断',
  'department': '申请科室',
  'sample': '标本',
  'applicationDate': '申请日期',
  'reportDate': '报告日期',
  'items': '检测项目'
};

const defaultBasicInfoState: DefaultBasicInfoState = {
  isDropdown: false,
  data: cloneDeep(defaultData),
  defaultData: cloneDeep(defaultData),
  displayNames
};

export default defaultBasicInfoState;
