import React, {useMemo, useRef, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link} from "@material-ui/core";
import dialogImage1 from './dialog-image-1.png';
import dialogImage2 from './dialog-image-2.png';

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
  iframe: {
    width: '100%',
    height: '29.7cm',
    border: 'solid 1px #ccc',
  },
  dialogLink: {
    textDecoration: 'underline dotted',
    cursor: 'help',
    '&:hover': {
      textDecoration: 'underline dotted',
    }
  },
  dialog: {
    '& img': {
      maxWidth: '100%'
    }
  },
  dialogContent: {
    width: '100%'
  }
}));

const GenerateReport = () => {
  const classes = useStyles();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false)
  };

  const handlePrint = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.focus();
      iframe.contentWindow.print()
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.pageHeader}>
        <Button variant="contained" disableElevation color="primary" onClick={handlePrint} className={classes.printButton}>
          打印
        </Button>
        <div>
          本页内容可编辑，如需隐藏页眉与页脚，请在
          <Link
            onClick={() => setDialogOpen(true)}
            className={classes.dialogLink}
          >打印窗口设置</Link>。
        </div>
      </div>

      <iframe title='report' ref={iframeRef} src={process.env.PUBLIC_URL + '/assets/report/report.html'} className={classes.iframe}/>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        className={classes.dialog}
      >
        <DialogTitle>如何隐藏页眉与页脚</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText>
            以火狐浏览器为例：
            <img src={dialogImage1} alt={'tutorial-image-1'}/>
            <img src={dialogImage2} alt={'tutorial-image-2'}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            关闭窗口
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

export default GenerateReport
