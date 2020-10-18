import React, {FormEvent} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button, TextField} from "@material-ui/core";
import Input from "../../services/form/input";
import Post from "../../services/post";

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

interface FormProps {
  title: string,
  buttonText: string,
  onSubmit: (e: FormEvent) => void,
  fields: Input[],
  request: Post<any>
}

const Form: React.FC<FormProps> = ({title, buttonText, fields, onSubmit, request}) => {
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
                       className={classes.textField}
                       onChange={(e) => item.updateValue(e.target.value)}
            />
          ))
        }
        <Button variant="contained" className={classes.button} disableElevation disabled={request.isLoading} type={'submit'}>
          {buttonText}
        </Button>
      </form>
    </div>
  )
};

export default Form
