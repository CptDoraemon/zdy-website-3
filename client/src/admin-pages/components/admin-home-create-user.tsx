import React, {useRef, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {observer} from "mobx-react";
import FormService from "../../services/form/form.service";
import PostService from "../../services/post.service";
import urls from "../../services/urls";
import InputService from "../../services/form/input.service";
import simpleValidator from "../../services/form/simple-validator";
import Form from "../../components/form/form";
import {IReactionDisposer, reaction} from "mobx";
import {useMount, useUnmount} from "react-use";

const initForm = () => {
  return new FormService(
    'create user', 'create',
    new PostService(urls.adminCreateUser),
    [
      new InputService(simpleValidator, 'username', 'username'),
      new InputService(simpleValidator, 'password', 'password', 'password')
    ]
  )
};

const useStyles = makeStyles(theme => ({
  root: {

  },
}));

interface AdminHomeCreateUserProps {
  refresh: () => void
}

const AdminHomeCreateUser = observer<React.FC<AdminHomeCreateUserProps>>(({refresh}) => {
  const classes = useStyles();
  const [formService, setFormService] = useState(initForm);

  const disposerRef = useRef<IReactionDisposer | null>(null);
  useMount(() => {
    disposerRef.current = reaction(
      () => formService.request.data,
      data => {
      if (data !== null) {
        // new user created
        refresh();
        setFormService(initForm())
      }
    });
  });
  useUnmount(() => {
    if (disposerRef.current) {
      disposerRef!.current()
    }
  });

  return (
      <Form title={formService.title} buttonText={formService.buttonText} onSubmit={formService.submit} fields={formService.fields} request={formService.request}/>
  )
});

export default AdminHomeCreateUser
