import {createStyles, lighten, Theme} from "@material-ui/core/styles";

export const successButtonStyles = (theme) => createStyles({
  root: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: lighten(theme.palette.success.main, 0.2),
    }
  }
});

export const warningButtonStyles = (theme) => createStyles({
  root: {
    backgroundColor: 'transparent',
    color: theme.palette.warning.dark,
    boxShadow: `inset 0 0 0 1px ${theme.palette.warning.main}`,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.warning.main,
      color: '#fff'
    },
    '&:active': {
      backgroundColor: lighten(theme.palette.warning.main, 0.2),
      color: '#fff'
    }
  }
});

export const primaryButtonStyles = (theme) => createStyles({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: lighten(theme.palette.primary.main, 0.2),
    }
  }
});

