export const testActions = {
    'TEST_UPDATE_NAME': 'TEST_UPDATE_NAME'
};

const updateName = (name) => {
  return {
      type: testActions['TEST_UPDATE_NAME'],
      name
  }
};

export const testActionsGenerators = {
  updateName
};
