import {cloneDeep} from "lodash";
import {Choice, FilterState, FilterTypes} from "../../states/filter";
import {filterActions} from "./filter";
import checkIfFilterValidationErrorExists from "./utils/check-if-filter-validation-error-exists";
import {Dispatch} from "redux";
import {FilterTableDefaultState} from "../../states/root-states";

const updatePendingFilterWithValueArray = (filterInternalName: string, value: string[]) => {
  return (dispatch: Dispatch, getState: () => FilterTableDefaultState) => {
    // do not proceed if table data is loading
    if (getState().table.loading) return;

    const prevFilterState = cloneDeep(getState().filter.filter);
    prevFilterState.forEach(obj => {
      if (obj.internalName === filterInternalName) {
        obj.pending = value.map(str => ({
            internalName: str,
            displayName: str
          })
        );
      }
    });

    dispatch({
      type: filterActions['FILTER_SET_FILTER_STATE'],
      newFilterState: Object.assign(
        {},
        getState().filter,
        {
          filter: prevFilterState,
          isPendingApplicable: !checkIfFilterValidationErrorExists(prevFilterState),
        }
      )
    })
  };
};

const updatePendingFilter = (filterInternalName: string, choiceInternalName: string, additionalKey?: string) => {
  return (dispatch: Dispatch, getState: () => FilterTableDefaultState) => {
    // do not proceed if table data is loading
    if (getState().table.loading) return;

    const prevFilterState = getState().filter.filter;
    const updatedFilterState = handleUpdatePendingFilter(prevFilterState, filterInternalName, choiceInternalName, additionalKey);
    dispatch({
      type: filterActions['FILTER_SET_FILTER_STATE'],
      newFilterState: Object.assign(
        {},
        getState().filter,
        {
          filter: updatedFilterState,
          isPendingApplicable: !checkIfFilterValidationErrorExists(updatedFilterState),
        }
      )
    })
  };
};

const handleUpdatePendingFilter = (prevState: FilterState[], filterInternalName: string, choiceInternalName: string, additionalKey?: string): FilterState[] => {
  prevState = cloneDeep(prevState);
  let targetFilter: FilterState | undefined = undefined;
  let targetFilterIndex: number | undefined = undefined;
  for (let i=0; i<prevState.length; i++) {
    if (prevState[i].internalName === filterInternalName) {
      targetFilter = cloneDeep<FilterState>(prevState[i]);
      targetFilterIndex = i;
      break;
    }
  }

  if (!targetFilter|| targetFilterIndex === undefined) return prevState;

  let updatedTargetFilter;
  switch (targetFilter.type) {
    case FilterTypes.range:
      updatedTargetFilter = updateRangeFilter(targetFilter, choiceInternalName, additionalKey || '');
      break;
    case FilterTypes.single:
      updatedTargetFilter = updateSingleFilter(targetFilter, choiceInternalName);
      break;
    case FilterTypes.multiple:
      updatedTargetFilter = updateMultipleFilter(targetFilter, choiceInternalName);
      break;
    default:
      updatedTargetFilter = targetFilter
  }

  prevState.splice(targetFilterIndex, 1, updatedTargetFilter);
  return prevState
};

const updateRangeFilter = (filterState: FilterState, choiceInternalName: string, additionalKey: string) => {
  // require additionalKey
  const possibleAdditionalKey = ['max', 'min'];
  if (possibleAdditionalKey.indexOf(additionalKey) === -1) return filterState;

  // reset error message
  filterState.validationMessage = '';

  // check validations
  const minIndex = 0;
  const maxIndex = 1;
  const allowedMin = parseFloat(filterState.choices[minIndex].internalName);
  const allowedMax = parseFloat(filterState.choices[maxIndex].internalName);
  const min = additionalKey === 'min' ? parseFloat(choiceInternalName) : parseFloat(filterState.pending[minIndex].internalName);
  const max = additionalKey === 'max' ? parseFloat(choiceInternalName) : parseFloat(filterState.pending[maxIndex].internalName);

  console.log(min, max);

  if (min < allowedMin || max > allowedMax) {
    filterState.validationMessage = `The number should between ${allowedMin} and ${allowedMax}`;
  } else if (min > max) {
    filterState.validationMessage = `maximum value should be larger than minimum value`;
  } else if (isNaN(min) || isNaN(max)) {
    filterState.validationMessage = `a number is required`;
  }

  filterState.pending = [
    {
      internalName: min.toString(),
      displayName: min.toString()
    },
    {
      internalName: max.toString(),
      displayName: max.toString()
    },
  ];
  return filterState
};

const updateSingleFilter = (filterState: FilterState, choiceInternalName: string) => {
  filterState.validationMessage = '';
  filterState.pending = filterState.choices.filter(choice => choice.internalName === choiceInternalName);

  return filterState
};

const updateMultipleFilter = (filterState: FilterState, choiceInternalName: string) => {
  // reset error message
  filterState.validationMessage = '';

  // check if choice exists, if so it indicates it's removing this choice from multiple choices
  let isFound = false;
  const newPending = cloneDeep<Choice[]>(filterState.pending);
  for (let i=0; i<newPending.length; i++) {
    if (newPending[i].internalName === choiceInternalName) {
      isFound = true;
      newPending.splice(i, 1);
      break
    }
  }

  // if not found, indicating it's adding new choice to the multiple choices
  if (!isFound) {
    const newChoice = filterState.choices.filter(choice => choice.internalName === choiceInternalName)[0];
    newPending.push(newChoice)
  }

  filterState.pending = newPending;

  // check validations
  if (newPending.length === 0) {
    filterState.validationMessage = 'At lease one is required';
  }
  return filterState
};

export default updatePendingFilter
export {updatePendingFilterWithValueArray}
