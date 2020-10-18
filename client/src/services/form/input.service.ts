import { makeObservable, observable, computed, action } from "mobx"

export type Validator = (value: string) => string | null

class InputService {
  blankErrorMessage = '';

  value = '';
  errorMessage = '';

  constructor(
    private validator: Validator,
    public inputLabel: string,
    public name: string,
    public type?: string
  ) {
    makeObservable(this, {
      value: observable,
      errorMessage: observable,
      isError: computed,
      updateValue: action,
      validate: action
    });
  }

  get isError() {
    return this.errorMessage !== this.blankErrorMessage
  }

  updateValue(newValue: string) {
    this.value = newValue
  }

  validate() {
    const validated = this.validator(this.value);
    this.errorMessage = validated === null ? this.blankErrorMessage : validated;
  }
}

export default InputService
