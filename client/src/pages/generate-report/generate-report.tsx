import React, {useMemo} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button} from "@material-ui/core";
import Logo from "../../components/logo/logo";
import './style.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflow: 'scroll'
  },
  printButton: {
    margin: theme.spacing(1, 0)
  },
  pageHeader: {
    margin: theme.spacing(1, 0)
  },
  printWrapper: {
    width: '21cm',
    height: '29.7cm',
    padding: '2.54cm',
    border: 'solid 1px #ccc',
    fontFamily: "SimSun,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    fontSize: '12pt',
    '& h1': {
      color: '#46978E',
      textAlign: 'center',
      fontSize: '22pt',
    },
    '& h2': {
      color: '#46978E',
      fontSize: '18pt',
    },
    '& span': {
      fontWeight: 'bold'
    },
  },
  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  sectionItem: {
    minWidth: '33%',
    lineHeight: 2
  },
  sectionItemDouble: {
    minWidth: '66%',
    lineHeight: 2
  }
}));

const GenerateReport = () => {
  const classes = useStyles();

  const handlePrint = () => {
    window.print()
  };

  const todayString = useMemo(() => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.pageHeader}>
        <Button variant="contained" disableElevation color="primary" onClick={handlePrint} className={classes.printButton}>
          打印
        </Button>
        <div>
          本页内容可编辑
        </div>
      </div>

      <div className={classes.printWrapper} contentEditable="true">
        <Logo width='50%'/>
        <h1>
          分子诊断中心测序报告单
        </h1>
        <h2>
          受检者基本信息
        </h2>
        <hr/>
        <div className={classes.section}>
          <span className={classes.sectionItem}>姓名：</span>
          <span className={classes.sectionItem}>性别：</span>
          <span className={classes.sectionItem}>年龄：</span>
          <span className={classes.sectionItem}>病理编号：</span>
          <span className={classes.sectionItem}>ID号：</span>
          <span className={classes.sectionItem}>电话：</span>
          <span className={classes.sectionItem}>诊断：</span>
          <span className={classes.sectionItem}>申请科室：</span>
          <span className={classes.sectionItem}>申请日期：{todayString}</span>
          <span className={classes.sectionItemDouble}>标本：</span>
          <span className={classes.sectionItem}>报告日期：{todayString}</span>
          <span className={classes.sectionItem}>检测项目：</span>
        </div>
        <hr/>
      </div>

    </div>
  )
};

export default GenerateReport
