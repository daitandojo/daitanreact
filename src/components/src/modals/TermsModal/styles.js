import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  header: {
    marginBottom: theme.spacing(3),
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  content: {
    maxHeight: '70vh',
    overflowY: 'auto',
  },
}));

export default useStyles;
