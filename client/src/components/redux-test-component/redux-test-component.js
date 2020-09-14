import React from "react";
import PropTypes from 'prop-types';

const ReduxTestComponent = ({name, updateName}) => {
  return (
    <div onClick={() => updateName('updated')}>
      {name}
    </div>
  )
};

ReduxTestComponent.propTypes = {
  name: PropTypes.string.isRequired,
  updateName: PropTypes.func.isRequired
};

export default ReduxTestComponent
