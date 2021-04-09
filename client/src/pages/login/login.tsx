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
    justifyContent: 'center',
    height: '100vh'
  },
  left: {
    width: 600,
    maxWidth: '100%',
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    backgroundColor: '#fff',
    height: '100%',
    overflowY: 'auto'
  },
  leftRow: {
    flex: '1 0 auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  introduction: {
    width: '100%',
    maxWidth: 400,
    padding: theme.spacing(2),
    '& p': {
      margin: theme.spacing(2, 0)
    }
  }
}));

const Login: React.FC = () => {
  const classes = useStyles();
  const [showLoginForm, setShowLoginForm] = useState(false);

  return (
    <div className={classes.root} >
      <div className={classes.left}>

        <div className={classes.leftRow}>
          <div className={classes.introduction}>
            <Typography variant={"body1"}>
              CIT-CoPT（Capture sequencing for Identifying Targets for Colorectal Personalized Therapy）是基于结直肠癌基因测序分析的临床个体化精准治疗新技术平台。平台建立了结直肠癌药物-靶标基因列表，对病人肿瘤样本进行针对性的外显子捕获测序，获取肿瘤基因突变谱。基于患者突变信息以及药物-靶标基因生物信息数据库，筛选病人可能的治疗响应药物。在体外利用来自病人肿瘤的类器官和异种移植培养模型，验证患者癌细胞对所选药物的敏感性，明确最有效的药物或药物组合。
            </Typography>
            <Typography variant={"body1"}>
              本平台通过分析结直肠癌病人基因组变异，找到适于每个病人的特异性药物靶点，推荐相应药物，朝向结直肠癌的精准医疗迈进。
            </Typography>
          </div>
        </div>

        <div className={classes.leftRow}>
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

      </div>

      <div className={classes.demo}>
        <img src={process.env.PUBLIC_URL + '/assets/background.jpg'} alt={'background'} className={classes.background}/>
      </div>

    </div>
  )
};

export default Login
