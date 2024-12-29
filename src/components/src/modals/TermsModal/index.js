import React from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useStyles from './styles';
import TermsContent from './components/Content';
import words from './words';
import { useLanguageContext } from '@/contexts/LanguageContext';

export default function TermsModal({ open, onClose }) {
  const classes = useStyles();
  const { currentLanguage } = useLanguageContext(); // Get current language from context

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={classes.modalBox}>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" className={classes.header}>
          {words.TermsAndConditions[currentLanguage]}
        </Typography>
        <Box className={classes.content}>
          <TermsContent />
        </Box>
      </Box>
    </Modal>
  );
}
