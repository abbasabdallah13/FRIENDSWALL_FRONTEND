import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme?.breakpoints?.down('xs')]: {
      flexDirection: 'column-reverse',
    },
    [theme?.breakpoints?.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  paper: {
    marginTop: theme?.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme?.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme?.spacing(1),
    },
  },
  avatar: {
    margin: theme?.spacing(1),
    backgroundColor: theme?.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme?.spacing(3),
  },
  submit: {
    margin: theme?.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme?.spacing(2),
  },

}));