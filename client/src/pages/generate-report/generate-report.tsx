import React, {useEffect, useRef, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  Box,
  Button, Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, LinearProgress,
  Link, Typography
} from "@material-ui/core";
import dialogImage1 from './dialog-image-1.png';
import dialogImage2 from './dialog-image-2.png';
import {useSelector} from "react-redux";
import {FilterTableDefaultState} from "../../app/filter-table/redux/states/root-states";
import axios from 'axios';
import {Alert} from "@material-ui/lab";

const useDownloadFont = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      await axios.request({
        url: 'https://cdn-1302264317.cos.ap-nanjing.myqcloud.com/SimSun.ttf',
        method: 'get',
        onDownloadProgress: (e) => {
          console.log(e)
          setProgress(Math.round(e.loaded / e.total * 100))
        }
      });
      setIsLoaded(true);
    })();
  }, []);

  return {
    isLoaded,
    progress
  }
};

const useGenerateTable = (tableData: any, iframeRef: React.RefObject<HTMLIFrameElement>) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  useEffect(() => {
    if (!tableData || !isIframeLoaded) {
      return
    }
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentDocument) {
      return
    }

    const iframeDocument = iframe.contentDocument;
    const header = ['Gene Symbol', '药品名', '药品类型', '病症', 'FDA Source'];
    const keys = ['Gene_symbol', 'Drug_name', 'Drug_type', 'disease', 'FDA Source'];
    const table = iframeDocument.getElementById('table');
    if (!table) {
      return
    }

    insertTableHeader();
    // @ts-ignore
    tableData.forEach(row => {
      insertTableRow(row)
    });

    function insertTableHeader() {
      const row = iframeDocument.createElement('tr');
      header.forEach(name => {
        const cell = iframeDocument.createElement('th');
        cell.innerText = name;
        row.appendChild(cell);
      });
      table!.appendChild(row);
    }

    function insertTableRow(data: string[]) {
      const row = iframeDocument.createElement('tr');
      keys.forEach(key => {
        const cell = iframeDocument.createElement('td');
        // @ts-ignore
        cell.innerText = data[key];
        row.appendChild(cell);
      });
      table!.appendChild(row);
    }

  }, [tableData, isIframeLoaded, iframeRef]);

  return setIsIframeLoaded
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
  const tableData = useSelector<FilterTableDefaultState>(state => state.table.data);

  const {
    isLoaded: isFontLoaded,
    progress: fontLoadProgress
  } = useDownloadFont();
  const setIsIframeLoaded = useGenerateTable(tableData, iframeRef);


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
                本页内容可编辑，如需隐藏页眉与页脚，请在
                <Link
                  onClick={() => setDialogOpen(true)}
                  className={classes.dialogLink}
                >打印窗口设置</Link>。
              </div>
            </Alert>
          </Box>
        </Collapse>
      </div>

      {
        !isFontLoaded &&
          <div className={classes.message}>
            下载字体中，请稍候...
            <Box display="flex" alignItems="center">
              <Box width={65} mr={1}>
                <LinearProgress variant="determinate" value={fontLoadProgress} />
              </Box>
              <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${fontLoadProgress}%`}</Typography>
              </Box>
            </Box>
          </div>
      }

      {
        isFontLoaded &&
        <iframe
            title='report'
            ref={iframeRef}
            src={process.env.PUBLIC_URL + '/assets/report/report.html'}
            className={classes.iframe}
            onLoad={() => setIsIframeLoaded(true)}
        />
      }

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
