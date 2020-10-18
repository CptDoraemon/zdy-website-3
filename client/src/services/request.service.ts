import {makeObservable, observable, computed, action, runInAction} from "mobx"
import axios, {AxiosRequestConfig} from 'axios';

class RequestService<IReturnedData> {
  protected readonly blankErrorMessage = '';
  protected readonly genericErrorMessage = 'server error';

  isLoading = false;
  data: IReturnedData | null = null;
  errorMessage = this.blankErrorMessage;

  constructor(
    protected url: string
  ) {
    makeObservable(this, {
      isLoading: observable,
      data: observable,
      errorMessage: observable,
      isError: computed,
      doRequest: action
    });
  }

  get isError() {
    return this.errorMessage !== this.blankErrorMessage
  }

  resetStates() {
    this.data = null;
    this.errorMessage = this.blankErrorMessage;
  }

  private succeededCallback(data: IReturnedData) {
    this.data = data
  }

  async doRequest<T>(axiosConfig: AxiosRequestConfig, callbackOnSucceeded?: (data: T) => void) {
    try {
      if (this.isLoading) return;
      this.isLoading = true;
      this.resetStates();

      const defaultUrlConfig: AxiosRequestConfig = {url: this.url, withCredentials: true};
      const config: AxiosRequestConfig = {...defaultUrlConfig, ...axiosConfig};
      const res = await axios(config);
      const data = res.data;

      callbackOnSucceeded ?
        runInAction(() => callbackOnSucceeded(data)) :
        runInAction(() => this.succeededCallback(data));
    } catch (e) {
      console.log('RequestServiceError', e);
      const newErrorMessage = e?.response?.data?.message || this.genericErrorMessage;
      runInAction(() => this.errorMessage = newErrorMessage);
    } finally {
      runInAction(() => this.isLoading = false);
    }
  }
}

export default RequestService
