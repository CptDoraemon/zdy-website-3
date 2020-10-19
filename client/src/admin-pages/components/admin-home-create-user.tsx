import React, {FormEvent, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {observer} from "mobx-react";
import FormService from "../../services/form/form.service";
import PostService from "../../services/post.service";
import urls from "../../services/urls";
import InputService from "../../services/form/input.service";
import simpleValidator from "../../services/form/simple-validator";
import Form from "../../components/form/form";

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

  const handleSubmit = async (e: FormEvent) => {
    await formService.submit(e);
    console.log(formService.request.data);
    if (formService.request.data !== null) {
      refresh();
      setFormService(initForm())
    }
  };

  return (
      <Form title={formService.title} buttonText={formService.buttonText} onSubmit={handleSubmit} fields={formService.fields} request={formService.request}/>
  )
});

export default AdminHomeCreateUser
