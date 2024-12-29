import React from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useStyles from './styles';
import PrivacyContent from './components/Content';

export default function PrivacyModal({ open, onClose }) {
  const classes = useStyles();

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={classes.modalBox}>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" className={classes.header}>Privacy Policy</Typography>
        <Box className={classes.content}>
          <PrivacyContent />
        </Box>
      </Box>
    </Modal>
  );
}
