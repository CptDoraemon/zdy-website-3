import InputService from "../services/form/input.service";
import PostService from "../services/post.service";
import {FormEvent} from "react";
import simpleValidator from "../services/form/simple-validator";
import urls from "../services/urls";

interface IBody {
  username: string,
  password: string,
  token: string
}

interface IResponse {
  username: string
}

class AdminRegisterService<FetchDataType> {

  public request = new PostService<IBody, IResponse>(urls.registerAdmin);
  public fields: InputService[] = [
    new InputService(simpleValidator, 'username'),
    new InputService(simpleValidator, 'password', 'password'),
    new InputService(simpleValidator, 'token', 'password')
  ];

  constructor(
    public title: string,
    public buttonText: string,
  ) {
    this.submit = this.submit.bind(this);
  }

  private validateAllInputs = () => {
    this.fields.forEach(field => field.validate());

    let isError = false;
    for (let i=0; i<this.fields.length; i++) {
      if (this.fields[i].isError) {
        isError = true;
        break;
      }
    }
    return isError
  };

  submit(e: FormEvent) {
    e.preventDefault();
    const isError = this.validateAllInputs();
    if (!isError) {
      const body = {
        username: this.fields[0].value,
        password: this.fields[1].value,
        token: this.fields[2].value
      };
      this.request.doPost({body})
    }
  }
}

export default AdminRegisterService
