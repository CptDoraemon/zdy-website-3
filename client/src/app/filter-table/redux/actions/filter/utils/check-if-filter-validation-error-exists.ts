import {FilterState} from "../../../states/filter";

const checkIfFilterValidationErrorExists = (filterFilterState: FilterState[]) => {
  for (let i=0; i<filterFilterState.length; i++) {
    if (filterFilterState[i].validationMessage !== '') {
      return true
    }
  }

  return false
};

export default checkIfFilterValidationErrorExists
