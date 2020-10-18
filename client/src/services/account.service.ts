import {makeObservable, observable, computed, action, observe} from "mobx"
import GetService from "./get.service";
import PostService from "./post.service";
import urls from "./urls";

interface IVerifyLoginResponse {
  username: string,

}

class AccountService {
  private readonly defaultErrorMessage = '';
  private readonly verifyLoginService = new GetService(urls.verifyLogin);

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
      verifyLogin: action
    });
  }

  get isError() {
    return this.errorMessage !== this.defaultErrorMessage
  }

  verifyLogin() {

  }
}

export default AccountService
