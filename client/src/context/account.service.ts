import {makeObservable, observable, computed, action, observe, runInAction} from "mobx"
import urls from "../services/urls";
import {AxiosRequestConfig} from "axios";
import RequestService from "../services/request.service";

interface IVerifyLoginResponse {
  username: string,
  isAdmin: boolean
}

class AccountService extends RequestService<any> {
  isLogin = false;
  isAdmin = false;
  username = '';

  constructor() {
    super('');

    makeObservable(this, {
      isLogin: observable,
      isAdmin: observable,
    });
  }

  async verifyLogin() {
    const config: AxiosRequestConfig = {url: urls.verifyLogin, method: 'GET'};
    const callbackOnSucceeded = (data: IVerifyLoginResponse) => {
      runInAction(() => {
        this.isLogin = true;
        this.isAdmin = data.isAdmin;
        this.username = data.username;
      });
    };
    await this.doRequest<IVerifyLoginResponse>(config, callbackOnSucceeded);
  }

  async logout() {
    const config: AxiosRequestConfig = {url: urls.logout, method: 'POST'};
    const callbackOnSucceeded = (data: any) => {
      runInAction(() => {
        this.isLogin = false;
        this.isAdmin = false;
        this.username = '';
      });
    };
    await this.doRequest(config, callbackOnSucceeded);
  }
}

export default AccountService
