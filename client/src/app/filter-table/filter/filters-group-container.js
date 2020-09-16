import {connect} from "react-redux";
import FiltersGroup from "./filters-group";
import {filterActionsGenerators} from "../redux/actions/filter/filter";

function mapDispatchToProps(dispatch) {
  return {
    updatePendingFilter: (filterInternalName, choiceInternalName, additionalKey) => dispatch(filterActionsGenerators.updatePendingFilter(filterInternalName, choiceInternalName, additionalKey)),
    updatePendingFilterWithValueArray: (filterInternalName, value) => dispatch(filterActionsGenerators.updatePendingFilterWithValueArray(filterInternalName, value)),
    toggleDropdown: () => dispatch(filterActionsGenerators.toggleDropdown()),
    applyPendingFilter: () => {dispatch(filterActionsGenerators.applyPendingFilter())},
    resetFilter: () => dispatch(filterActionsGenerators.resetFilter())
  }
}

function mapStateToProps(state) {
  return {
    filters: state.filter.filter,
    isPendingApplicable: state.filter.isPendingApplicable,
    isResettable: state.filter.isResettable,
    disabled: state.table.disabled,
    dropdown: state.filter.dropdown
  }
}

const FiltersGroupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FiltersGroup);

export default FiltersGroupContainer
