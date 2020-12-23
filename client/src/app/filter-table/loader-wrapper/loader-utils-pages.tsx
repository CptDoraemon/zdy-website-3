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
      {message || '服务器错误，请稍后重试'}
    </Wrapper>
  )
};

const NoResultFound = () => {
  return (
    <Wrapper>
      未找到符合条件的结果
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

