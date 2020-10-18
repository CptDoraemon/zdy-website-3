import Input from "../services/form/input";
import Post from "../services/post";
import {FormEvent} from "react";
import simpleValidator from "../services/form/simple-validator";

class AdminRegisterService<FetchDataType> {
  username = new Input(simpleValidator, 'username');
  password = new Input(simpleValidator, 'password');
  token = new Input(simpleValidator, 'token');
  request = new Post();

  constructor(
    public title: string,
    public buttonText: string
  ) {
    this.submit = this.submit.bind(this);
  }

  private validateAllInputs = () => {
    const fields = [this.username, this.password, this.token];
    fields.forEach(field => field.validate());

    let isError = false;
    for (let i=0; i<fields.length; i++) {
      if (fields[i].isError) {
        isError = true;
        break;
      }
    }
  };

  submit(e: FormEvent) {
    e.preventDefault();
    this.validateAllInputs();
  }
}

export default AdminRegisterService
