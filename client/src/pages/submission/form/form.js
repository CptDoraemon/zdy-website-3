import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextInput from "./text-input";
import TextArea from "./text-area";
import TextInputFile from "./text-input-file";
import {Button} from "@material-ui/core";
import {successButtonStyles, warningButtonStyles} from "../../../styles";
import useForm from "./use-form";
import FormUploadStatus from "./form-upload-status";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flexStart'
  },
  itemWrapper: {
    width: 500,
    maxWidth: '100%',
    margin: theme.spacing(1)
  },
  submitButton: {
    ...successButtonStyles(theme).root,
    margin: theme.spacing(5, 0),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1, 0),
      display: 'block'
    }
  },
  resetButton: {
    ...warningButtonStyles(theme).root,
    margin: theme.spacing(5, 1),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 0, 1, 0),
      display: 'block'
    }
  }
}));

const Form = ({resetForm}) => {
  const classes = useStyles();

  const {
    name,
    email,
    note,
    file,
    submit,
    loading,
    successMessage,
    errorMessage,
    progress
  } = useForm();

  const submitted = successMessage !== null;

  return (
    <form className={classes.root} onSubmit={submit}>
      <div className={classes.itemWrapper}>
        <TextInput
          label={'Name (optional)'}
          error={name.error}
          errorMessage={name.errorMessage}
          value={name.value}
          onChange={name.handleChange}
        />
      </div>
      <div className={classes.itemWrapper}>
        <TextInput
          label={'Email (optional)'}
          error={email.error}
          errorMessage={email.errorMessage}
          value={email.value}
          onChange={email.handleChange}
        />
      </div>
      <div className={classes.itemWrapper}>
        <TextArea
          label={'Note'}
          error={note.error}
          errorMessage={note.errorMessage}
          value={note.value}
          onChange={note.handleChange}
        />
      </div>
      <div className={classes.itemWrapper}>
        <TextInputFile
          helperText={
            file.helperMessage ||
            'Please provide a .csv file, max size allowed is 5MB'
          }
          error={file.error}
          errorMessage={file.errorMessage}
          onChange={file.handleChange}
        />
      </div>
      <div className={classes.itemWrapper}>
        <Button variant="contained" className={classes.submitButton} disableElevation type={'submit'} disabled={loading || submitted}>
          Submit
        </Button>
        {
          submitted &&
          <Button variant="contained" className={classes.resetButton} disableElevation disabled={loading} onClick={resetForm}>
            Upload Another
          </Button>
        }
      </div>
      <div className={classes.itemWrapper}>
        <FormUploadStatus loading={loading} progress={progress} errorMessage={errorMessage} successMessage={successMessage}/>
      </div>
    </form>
  )
};

export default Form

