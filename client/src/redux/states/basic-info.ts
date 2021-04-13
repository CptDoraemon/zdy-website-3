import cloneDeep from 'lodash/cloneDeep'

export interface DefaultBasicInfoState {
  isDropdown: boolean,
  data: typeof defaultData,
  defaultData: typeof defaultData,
  displayNames: typeof defaultData,
}

const date = new Date();
const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const defaultData = {
  'name': '吴美荣',
  'sex': '女',
  'age': '71',
  'diseaseId': 'BI21-02120',
  'id': '3017659',
  'phone': '15112597986',
  'diagnose': '1、乙状结肠中分化腺癌 \n2、缺铁性贫血',
  'department': '肠胃外科',
  'sample': '乙状结肠组织',
  'items': '分子诊断用药',
  'applicationDate': dateString,
  'reportDate': dateString,
};

const displayNames = {
  'name': '姓名',
  'sex': '性别',
  'age': '年龄',
  'diseaseId': '病理编号',
  'id': 'ID号',
  'phone': '电话',
  'diagnose': '诊断',
  'department': '申请科室',
  'sample': '标本',
  'items': '检测项目',
  'applicationDate': '申请日期',
  'reportDate': '报告日期',
};

const defaultBasicInfoState: DefaultBasicInfoState = {
  isDropdown: true,
  data: cloneDeep(defaultData),
  defaultData: cloneDeep(defaultData),
  displayNames
};

export default defaultBasicInfoState;
