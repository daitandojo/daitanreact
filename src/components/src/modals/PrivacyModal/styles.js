import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: 800,
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: '12px',
    outline: 'none',
  },
  header: {
    marginBottom: theme.spacing(3),
    fontWeight: 600,
    textAlign: 'center',
  },
  content: {
    maxHeight: '70vh',
    overflowY: 'auto',
    paddingRight: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

export default useStyles;
