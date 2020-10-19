import React, {useEffect, useRef, useState} from "react";
import { observer } from "mobx-react"
import Form from "../components/form/form";
import FormService from "../services/form/form.service";
import PostService from "../services/post.service";
import urls from "../services/urls";
import InputService from "../services/form/input.service";
import simpleValidator from "../services/form/simple-validator";
import { useHistory } from "react-router-dom";
import {autorun} from "mobx";
import routerUrls from "../router-urls";

interface IBody {
  username: string,
  password: string,
}

interface IResponse {
  username: string
}

const AdminLogin = observer(() => {
  const [service] = useState(() => {
    return new FormService(
      'Admin Login',
      'login',
      new PostService<IBody, IResponse>(urls.adminLogin),
      [
        new InputService(simpleValidator, 'username', 'username'),
        new InputService(simpleValidator, 'password', 'password','password')
      ]
    )
  });

  // redirect after login
  const history = useHistory();
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      const disposer = autorun(() => {
        const loginSucceeded = service.request.data !== null;
        if (loginSucceeded) {
          history.replace(routerUrls.landingPage);
        }
      });
      mountedRef.current = true;
      return () => {
        disposer();
      }
    }
  }, [history, service.request.data]);

  return (
    <Form title={service.title} buttonText={service.buttonText} onSubmit={service.submit} fields={service.fields} request={service.request}/>
  )
});

export default AdminLogin
