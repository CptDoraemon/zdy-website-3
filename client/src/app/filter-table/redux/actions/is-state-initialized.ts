export const isStateInitializedAction = {
  'IS_STATE_INITIALIZED_INITIALIZED': 'IS_STATE_INITIALIZED_INITIALIZED',
};

export const stateInitialized = () => {
  return {
    type: isStateInitializedAction.IS_STATE_INITIALIZED_INITIALIZED
  }
};

export default stateInitialized
