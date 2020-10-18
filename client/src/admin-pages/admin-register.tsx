import React, { useState} from "react";
import { observer } from "mobx-react"
import AdminRegisterService from "./admin-register.service";
import Form from "../components/form/form";

const AdminRegister = observer(() => {
  const [service] = useState(() => {
    return new AdminRegisterService(
      'Admin Register',
      'register',
    )
  });

  return (
    <Form title={service.title} buttonText={service.buttonText} onSubmit={service.submit} fields={service.fields} request={service.request}/>
  )
});

export default AdminRegister
