import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 100
  },
}));

/**
 * @param {boolean} loading
 * @param {string} progress
 * @param {string} errorMessage
 * @param {string} successMessage
 * @constructor
 */
const FormUploadStatus = ({loading, progress, errorMessage, successMessage}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
        loading && progress !== '100' && progress !== '0' &&
        <LinearProgressWithLabel value={progress} />
      }
      {
        loading && progress === '100' &&
        <>
          <LinearProgress />
          <Typography variant="body2" color="textSecondary">Processing...</Typography>
        </>
      }
      {
        errorMessage &&
        <Alert severity="error">{ errorMessage }</Alert>
      }
      {
        successMessage &&
        <Alert severity="success">{ successMessage }</Alert>
      }
    </div>
  )
};

const LinearProgressWithLabel = ({value}) => {
  return (
    <>
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={parseInt(value)} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${value}%`}</Typography>
      </Box>
    </>
  );
};

export default FormUploadStatus

