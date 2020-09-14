import ReduxTestComponent from "./redux-test-component";
import {testActionsGenerators} from "../../redux/actions/test";
import {connect} from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    updateName: (name) => dispatch(testActionsGenerators.updateName(name)),
  }
}

function mapStateToProps(state) {
  return {
    name: state.test.name
  }
}

const ReduxTestComponentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxTestComponent);

export default ReduxTestComponentContainer
