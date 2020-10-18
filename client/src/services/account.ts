import { makeObservable, observable, computed, action } from "mobx"

class Account {
  defaultErrorMessage = '';

  isLogin = false;
  isAdmin = false;
  isLoading = false;
  errorMessage = this.defaultErrorMessage;

  constructor() {
    makeObservable(this, {
      isLogin: observable,
      isAdmin: observable,
      isLoading: observable,
      errorMessage: observable,
      isError: computed,
    });
  }

  get isError() {
    return this.errorMessage === this.defaultErrorMessage
  }
}

export default Account
