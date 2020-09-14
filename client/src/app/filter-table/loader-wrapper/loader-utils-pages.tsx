import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const Loading: React.FC<{
  height?: number
}> = ({height}) => {
  return (
    <Wrapper height={height}>
      <CircularProgress disableShrink />
    </Wrapper>
  )
};

const Error: React.FC<{
  message?: string
}> = ({message}) => {
  return (
    <Wrapper>
      {message || 'Failed to load table data'}
    </Wrapper>
  )
};

const NoResultFound = () => {
  return (
    <Wrapper>
      No result found with the applied filters
    </Wrapper>
  )
};

const Wrapper: React.FC<{
  height?: number
}> = ({children, height}) => {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{height}}>
      {children}
    </div>
  )
};

export {Loading, Error, NoResultFound}

