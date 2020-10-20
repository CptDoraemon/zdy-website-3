import React, {useRef, useState} from "react";
import { observer } from "mobx-react"
import Form from "../components/form/form";
import FormService from "../services/form/form.service";
import PostService from "../services/post.service";
import urls from "../services/urls";
import InputService from "../services/form/input.service";
import simpleValidator from "../services/form/simple-validator";
import {IReactionDisposer, reaction} from "mobx";
import {useMount} from "react-use";
import routerUrls from "../router-urls";
import useRedirectWhenValueNotNull from "../utils/use-redirect-on-change";

interface IBody {
  username: string,
  password: string,
  token: string
}

interface IResponse {
  username: string
}

const AdminRegister = observer(() => {
  const [service] = useState(() => {
    return new FormService(
      'Admin Register',
      'register',
      new PostService<IBody, IResponse>(urls.registerAdmin),
      [
        new InputService(simpleValidator, 'username', 'username'),
        new InputService(simpleValidator, 'password', 'password','password'),
        new InputService(simpleValidator, 'token', 'token','password')
      ]
    )
  });

  useRedirectWhenValueNotNull(() => service.request.data);

  return (
    <Form title={service.title} buttonText={service.buttonText} onSubmit={service.submit} fields={service.fields} request={service.request}/>
  )
});

// interface AdminRegisterFormProps {
//   service: FormService<IBody, IResponse>
// }
//
// const AdminRegisterForm = observer<React.FC<AdminRegisterFormProps>>(({service}) => {
//   const [service] = useState(() => {
//     return new FormService(
//       'Admin Register',
//       'register',
//       new PostService<IBody, IResponse>(urls.registerAdmin),
//       [
//         new InputService(simpleValidator, 'username', 'username'),
//         new InputService(simpleValidator, 'password', 'password','password'),
//         new InputService(simpleValidator, 'token', 'token','password')
//       ]
//     )
//   });
//
//   return (
//     <Form title={service.title} buttonText={service.buttonText} onSubmit={service.submit} fields={service.fields} request={service.request}/>
//   )
// });

export default AdminRegister
