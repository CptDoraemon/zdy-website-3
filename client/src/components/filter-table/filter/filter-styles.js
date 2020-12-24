import {createStyles} from "@material-ui/core/styles";

const filterStyles = (theme) => createStyles({
  text: {
    textTransform: 'capitalize',
    fontSize: theme.typography.body2.fontSize
  },
  error: {
    color: theme.palette.error.main,
    '&$:focus': {
      color: theme.palette.error.main,
    }
  }
});

export default filterStyles
