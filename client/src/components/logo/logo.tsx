import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '100%',
  },
  logo: {
    width: '100%',
  }
}));

interface LogoProps {
  width?: string
}

const Logo: React.FC<LogoProps> = ({width}) => {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{width: width || 300}}>
      <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt='logo' className={classes.logo}/>
    </div>
  )
};

export default Logo
