import React, {useState} from "react";
import { observer } from "mobx-react"
import Form from "../../components/form/form";
import FormService from "../../services/form/form.service";
import PostService from "../../services/post.service";
import urls from "../../services/urls";
import InputService from "../../services/form/input.service";
import simpleValidator from "../../services/form/simple-validator";
import useRedirectWhenValueNotNull from "../../utils/use-redirect-on-change";

interface IBody {
  username: string,
  password: string,
}

interface IResponse {
  username: string
}

const Login = observer(() => {
  const [service] = useState(() => {
    return new FormService(
      'Login',
      'login',
      new PostService<IBody, IResponse>(urls.login),
      [
        new InputService(simpleValidator, 'username', 'username'),
        new InputService(simpleValidator, 'password', 'password','password')
      ]
    )
  });

  useRedirectWhenValueNotNull(() => service.request.data);

  return (
    <Form title={service.title} buttonText={service.buttonText} onSubmit={service.submit} fields={service.fields} request={service.request}/>
  )
});

export default Login