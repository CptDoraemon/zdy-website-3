import React, {useState} from "react";
import { observer } from "mobx-react"
import Form from "../../components/form/form";
import FormService from "../../services/form/form.service";
import PostService from "../../services/post.service";
import urls from "../../services/urls";
import InputService from "../../services/form/input.service";
import simpleValidator from "../../services/form/simple-validator";
import useRedirectWhenValueNotNull from "../../utils/use-redirect-on-change";
import Logo from "../../components/logo/logo";

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
      '登录',
      '登录',
      new PostService<IBody, IResponse>(urls.login),
      [
        new InputService(simpleValidator, '用户名', 'username'),
        new InputService(simpleValidator, '密码', 'password','password')
      ]
    )
  });

  useRedirectWhenValueNotNull(() => service.request.data);

  return (
    <>
      <Logo/>
      <Form title={service.title} buttonText={service.buttonText} onSubmit={service.submit} fields={service.fields} request={service.request}/>
    </>
  )
});

export default Login
