import {Validator} from "./input";

const simpleValidator: Validator = (value: string) => {
  if (value.length < 5) {
    return 'Minimum 5 characters required.'
  } else {
    return null
  }
};

export default simpleValidator

