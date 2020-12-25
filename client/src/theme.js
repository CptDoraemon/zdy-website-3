import {createMuiTheme, responsiveFontSizes} from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#46978E',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff9ca7',
      contrastText: '#fff',
    },
    success: {
      main: '#4caf50',
      contrastText: '#fff',
    }
  },
  typography: {
    "fontFamily": '"Gotham", Helvetica, Arial, PingFangSC-Regular, "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;',
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  }
});
theme = responsiveFontSizes(theme);

export default theme;
