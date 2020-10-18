import { makeObservable, observable, computed, action } from "mobx"

class Post<DataType> {
  defaultErrorMessage = '';

  isLoading = false;
  data: DataType | null = null;
  errorMessage = this.defaultErrorMessage;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      data: observable,
      errorMessage: observable,
      isError: computed,
    });
  }

  get isError() {
    return this.errorMessage === this.defaultErrorMessage
  }
}

export default Post
