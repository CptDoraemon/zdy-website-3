import React, {useRef, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  Box,
  Button, Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link
} from "@material-ui/core";
import dialogImage1 from './dialog-image-1.png';
import dialogImage2 from './dialog-image-2.png';
import {useSelector} from "react-redux";
import {FilterTableDefaultState} from "../../redux/states/root-states";
import {Alert} from "@material-ui/lab";
import useHydrateTable from "./use-hydrate-table";
import useHydrateBasicInfo from "./use-hydrate-baisc-info";

const useConnect = () => {
  const tableData = useSelector<FilterTableDefaultState>(state => state.table.data);
  const basicInfoData = useSelector((state: FilterTableDefaultState) => state.basicInfo.data);
  const basicInfoDisplayNames = useSelector((state: FilterTableDefaultState) => state.basicInfo.displayNames);

  return {
    tableData,
    basicInfoData,
    basicInfoDisplayNames
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflow: 'scroll'
  },
  message: {
    width: '100%',
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
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
    border: 'none',
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
  const [infoOpen, setInfoOpen] = useState(true);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const {
    tableData,
    basicInfoData,
    basicInfoDisplayNames
  } = useConnect();

  useHydrateBasicInfo(basicInfoData, basicInfoDisplayNames, iframeRef, isIframeLoaded);
  useHydrateTable(tableData, iframeRef, isIframeLoaded);

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

        <Collapse in={infoOpen}>
          <Box my={1}>
            <Alert severity="info" onClose={() => setInfoOpen(false)}>
              <div>
                如需隐藏页眉与页脚，请在
                <Link
                  onClick={() => setDialogOpen(true)}
                  className={classes.dialogLink}
                >打印窗口设置</Link>。
              </div>
            </Alert>
          </Box>
        </Collapse>
      </div>

      <iframe
          title='report'
          ref={iframeRef}
          src={process.env.PUBLIC_URL + '/assets/report/report.html'}
          className={classes.iframe}
          onLoad={() => setIsIframeLoaded(true)}
      />

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
