import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Form from "./form/form";

const useResetForm = () => {
  const [key, setKey] = useState(0);

  const resetForm = () => {
    setKey(prevKey => prevKey + 1)
  };

  return {
    key,
    resetForm
  }
};

const useStyles = makeStyles(theme => ({
  root: {

  },
  title: {
    fontWeight: 700,
    textTransform: 'uppercase'
  }
}));

const Submission = ({reload}) => {
  const classes = useStyles();

  const {
    key,
    resetForm
  } = useResetForm();

  return (
    <div className={classes.root}>
      <Typography variant={'body1'} component={'h1'} className={classes.title}>
          Contribute to the database
      </Typography>
      <Form resetForm={resetForm} key={key}/>
    </div>
  )
};

export default Submission

