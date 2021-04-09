import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LoginFormContainer from "./login-form-container";
import {Box, Button, Slide, Typography} from "@material-ui/core";
import RecentActorsIcon from '@material-ui/icons/RecentActors';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      minHeight: '100vh',
      flexDirection: 'column',
    }
  },
  left: {
    width: '35%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: '#fff',
    height: '100%',
    overflowY: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flex: '1 0 auto',
      minHeight: 350,
    }
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
  right: {
    height: '100%',
    width: '65%',
    backgroundColor: '#eee',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/background.jpg'})`,
    backgroundSize: 'cover',
    backgroundPosition: '0 100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flex: '1 0 auto'
    }
  },
  introduction: {
    width: `calc(100% - ${theme.spacing(2) * 2}px)`,
    maxWidth: 800,
    padding: theme.spacing(3, 8),
    margin: theme.spacing(2),
    backgroundColor: 'rgba(255,255,255,0.8)',
    // boxShadow: 'inset 0 0 15px 5px rgba(255,255,255,0.5), 0 0 15px 5px rgba(255,255,255,0.5)',
    borderRadius: 5,
    borderLeft: `solid 5px rgba(255,131,0,0.5)`,
    '& p': {
      margin: theme.spacing(4, 0),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 4),
    }
  }
}));

const Login: React.FC = () => {
  const classes = useStyles();
  const [showLoginForm, setShowLoginForm] = useState(false);

  return (
    <div className={classes.root} >
      <div className={classes.left}>
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
                CIT-CoPT
              </Box>
            </Typography>
            <Button color={'primary'} startIcon={<RecentActorsIcon/>} onClick={() => setShowLoginForm(true)} style={{marginLeft: -4}}>
              登录
            </Button>
          </div>
        }
      </div>

      <div className={classes.right}>
        <div className={classes.introduction}>
          <Typography variant={"body1"} component={'p'}>
            CIT-CoPT（Capture sequencing for Identifying Targets for Colorectal Personalized Therapy）是基于结直肠癌基因测序分析的临床个体化精准治疗新技术平台。平台建立了结直肠癌药物-靶标基因列表，对病人肿瘤样本进行针对性的外显子捕获测序，获取肿瘤基因突变谱。基于患者突变信息以及药物-靶标基因生物信息数据库，筛选病人可能的治疗响应药物。在体外利用来自病人肿瘤的类器官和异种移植培养模型，验证患者癌细胞对所选药物的敏感性，明确最有效的药物或药物组合。
          </Typography>
          <Typography variant={"body1"} component={'p'}>
            本平台通过分析结直肠癌病人基因组变异，找到适于每个病人的特异性药物靶点，推荐相应药物，朝向结直肠癌的精准医疗迈进。
          </Typography>
        </div>
      </div>

    </div>
  )
};

export default Login
