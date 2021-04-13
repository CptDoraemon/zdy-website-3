export enum FilterTypes {
  range = 'range',
  single = 'single',
  multiple = 'multiple',
  multipleTextarea = 'multipleTextarea'
}

export interface Choice {
  displayName: string,
  internalName: string
}

export interface FilterState {
  displayName: string,
  internalName: string,
  type: FilterTypes,
  choices: Choice[]
  original: Choice[],
  active: Choice[],
  pending: Choice[],
  validationMessage: string
}

export interface DefaultFilterState {
  filter: FilterState[],
  isPendingApplicable: boolean,
  isResettable: boolean,
  dropdown: boolean
}

const defaultFilterState: DefaultFilterState = {
  filter: [],
  isPendingApplicable: true,
  isResettable: false, // when the active state is different than the original state, the filters are resettable
  dropdown: true
};

export default defaultFilterState
