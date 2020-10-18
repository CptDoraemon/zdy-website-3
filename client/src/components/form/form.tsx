import React, {FormEvent} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button, TextField} from "@material-ui/core";
import InputService from "../../services/form/input.service";
import PostService from "../../services/post.service";
import {observer} from "mobx-react";

const rowWidth = 300;
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  title: {
    minWidth: rowWidth,
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
    minWidth: rowWidth,
    maxWidth: '100%'
  },
  errorMessage: {
    color: theme.palette.error.main,
    textTransform: 'capitalize',
    textAlign: 'center',
    fontWeight: 700
  },
  button: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    minWidth: rowWidth,
    maxWidth: '100%',
    margin: theme.spacing(1, 0),
    fontWeight: 700,
    '&:hover': {
      backgroundColor: theme.palette.success.light,
    }
  }
}));

interface FormProps {
  title: string,
  buttonText: string,
  onSubmit: (e: FormEvent) => void,
  fields: InputService[],
  request: PostService<any, any>
}

const Form: React.FC<FormProps> = observer(({title, buttonText, fields, onSubmit, request}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2 className={classes.title}>
        {title}
      </h2>
      <form className={classes.form} onSubmit={onSubmit}>
        {
          fields.map(item => (
            <TextField key={item.inputLabel} variant={'outlined'} label={item.inputLabel} value={item.value}
                       error={item.isError} helperText={item.errorMessage || "\u00a0"}
                       className={classes.textField} type={item.type || 'text'}
                       onChange={(e) => item.updateValue(e.target.value)}
            />
          ))
        }
        <div className={classes.errorMessage}>
          { request.isError ? request.errorMessage : "\u00a0" }
        </div>
        <Button variant="contained" className={classes.button} disableElevation disabled={request.isLoading} type={'submit'}>
          {buttonText}
        </Button>
      </form>
    </div>
  )
});

export default Form
