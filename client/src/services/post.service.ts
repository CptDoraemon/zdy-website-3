import {makeObservable, observable, computed, action, runInAction} from "mobx"
import axios from 'axios';

class PostService<IBody, IReturnedData> {
  private readonly blankErrorMessage = '';
  private readonly genericErrorMessage = 'server error';

  isLoading = false;
  data: IReturnedData | null = null;
  errorMessage = this.blankErrorMessage;

  constructor(
    private url: string
  ) {
    makeObservable(this, {
      isLoading: observable,
      data: observable,
      errorMessage: observable,
      isError: computed,
      doPost: action
    });
  }

  get isError() {
    return this.errorMessage !== this.blankErrorMessage
  }

  resetStates() {
    this.data = null;
    this.errorMessage = this.blankErrorMessage;
  }

  async doPost({url, body}: {url?: string, body: IBody}) {
    try {
      if (this.isLoading) return;
      this.isLoading = true;
      this.resetStates();

      const _url = url || this.url; // provide a way to override class url
      const res = await axios.post(_url, body);
      const data = res.data;
      runInAction(() => this.data = data);
    } catch (e) {
      console.log('PostServiceError', e);
      const newErrorMessage = e?.response?.data?.message || this.genericErrorMessage;
      runInAction(() => this.errorMessage = newErrorMessage);
    } finally {
      runInAction(() => this.isLoading = false);
    }
  }
}

export default PostService
