import InputService from "./input.service";
import PostService from "../post.service";
import {FormEvent} from "react";

class FormService<IBody, IResponse> {

  constructor(
    public title: string,
    public buttonText: string,
    public request: PostService<IBody, IResponse>,
    public fields: InputService[],
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
      const body = {};
      // @ts-ignore
      this.fields.forEach(field => body[field.name] = field.value);
      // @ts-ignore
      this.request.doPost({body})
    }
  }
}

export default FormService
