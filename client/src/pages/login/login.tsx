import React, {useState} from "react";
import useGetScreenSize from "./use-get-screen-size";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LoginFormContainer from "./login-form-container";
import {Box, Button, Slide, Typography} from "@material-ui/core";
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import Logo from "../../components/logo/logo";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    width: 600,
    maxWidth: '100%',
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  logo: {
    position: 'absolute',
    top: 15,
    left: '50%',
    transform: 'translateX(-50%)'
  },
  loginForm: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginFormMessage: {
    width: '80%',
  },
  demo: {
    height: '100%',
    flex: '1 1 auto',
    backgroundColor: '#eee',
    position: 'relative',
  },
  background: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    backgroundPosition: '0 100%',
    position: 'absolute'
  }
}));

const Login: React.FC = () => {
  const classes = useStyles();
  const screenHeight = useGetScreenSize();
  const [showLoginForm, setShowLoginForm] = useState(false);

  if (!screenHeight) {
    return <></>
  }

  return (
    <div className={classes.root} >
      <div className={classes.left} style={{height: screenHeight}}>
        {/*<div className={classes.logo}>*/}
        {/*  <Logo width={'300px'}/>*/}
        {/*</div>*/}
        {
          showLoginForm &&
          <Slide in={true} direction={'left'}>
            <div className={classes.loginForm}>
              <LoginFormContainer/>
            </div>
          </Slide>
        }
        {
          !showLoginForm &&
            <div>
              <Typography variant={'h5'} component={'h1'}>
                <Box fontWeight={700} mb={1}>
                  心情惬意，来测个序吧 🔬
                </Box>
              </Typography>
              <Button color={'primary'} startIcon={<RecentActorsIcon/>} onClick={() => setShowLoginForm(true)} style={{marginLeft: -4}}>
                登录
              </Button>
            </div>
        }
      </div>
      <div className={classes.demo} style={{height: screenHeight}}>
        <img src={process.env.PUBLIC_URL + '/assets/background.jpg'} alt={'background'} className={classes.background}/>
      </div>
    </div>
  )
};

export default Login
