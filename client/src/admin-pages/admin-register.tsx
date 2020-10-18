import React, { useState} from "react";
import { observer } from "mobx-react"
import AdminRegisterService from "./admin-register.service";
import {Button, TextField} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  title: {
    minWidth: 300,
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: theme.typography.h5.fontSize,
    fontWeight: 700
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textField: {
    minWidth: 300,
    maxWidth: '100%'
  },
  button: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    minWidth: 300,
    maxWidth: '100%',
    margin: theme.spacing(1, 0),
    '&:hover': {
      backgroundColor: theme.palette.success.light,
    }
  }
}));

const AdminRegister = observer(() => {
  const classes = useStyles();
  const [service] = useState(() => new AdminRegisterService('Admin Register', 'register'));
  const fields = [service.username, service.password, service.token];

  console.log(service);

  return (
    <div className={classes.root}>
      <h2 className={classes.title}>
        {service.title}
      </h2>
      <form className={classes.form} onSubmit={service.submit}>
        {
          fields.map(item => (
            <TextField key={item.inputLabel} variant={'outlined'} label={item.inputLabel} value={item.value}
                       error={item.isError} helperText={item.errorMessage || "\u00a0"}
                       className={classes.textField}
                       onChange={(e) => item.updateValue(e.target.value)}
            />
          ))
        }
        <Button variant="contained" className={classes.button} disableElevation disabled={service.request.isLoading} type={'submit'}>
          {service.buttonText}
        </Button>
      </form>
    </div>
  )
});

export default AdminRegister
