import React, {FormEvent} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button, TextField} from "@material-ui/core";
import InputService from "../../services/form/input.service";
import PostService from "../../services/post.service";
import {observer} from "mobx-react";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 300
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textField: {
    margin: theme.spacing(1, 0)
  },
  errorMessage: {
    color: theme.palette.error.main,
    textTransform: 'capitalize',
    textAlign: 'center',
    fontWeight: 700
  },
  button: {
    margin: theme.spacing(1, 0),
    fontWeight: 700,
    marginRight: 'auto',
    minWidth: '30%',
    maxWidth: '100%'
  }
}));

interface LoginFormProps {
  title: string,
  buttonText: string,
  onSubmit: (e: FormEvent) => void,
  fields: InputService[],
  request: PostService<any, any>
}

const LoginForm: React.FC<LoginFormProps> = observer(({title, buttonText, fields, onSubmit, request}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit}>
        {
          fields.map(item => (
            <TextField
              key={item.inputLabel}
              variant={'outlined'}
              label={item.inputLabel}
              value={item.value}
              error={item.isError}
              helperText={item.errorMessage}
              className={classes.textField} type={item.type || 'text'}
              size={"small"}
              onChange={(e) => item.updateValue(e.target.value)}
              fullWidth
            />
          ))
        }
        <div className={classes.errorMessage}>
          { request.isError && request.errorMessage }
        </div>
        <Button variant="contained" className={classes.button} disableElevation disabled={request.isLoading} type={'submit'} color={'primary'}>
          {buttonText}
        </Button>
      </form>
    </div>
  )
});

export default LoginForm
