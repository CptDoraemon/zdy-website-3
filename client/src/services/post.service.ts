import {AxiosRequestConfig} from 'axios';
import RequestService from "./request.service";

class PostService<IBody, IReturnedData> extends RequestService<IReturnedData> {

  async doPost({url, body}: {url?: string, body: IBody}) {
    const config: AxiosRequestConfig = {data: body, method: 'POST'};
    if (url) config.url = url;
    this.doRequest(config)
  }

}

export default PostService
