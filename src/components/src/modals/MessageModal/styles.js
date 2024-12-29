import { styled } from '@mui/material/styles';
import { Box, Button, List, Typography, Modal } from '@mui/material';

export const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledModalContent = styled(Box)(({ theme }) => ({
  width: "90%",
  maxWidth: '1000px',
  height: "90%",
  maxHeight: "900px",
  backgroundColor: '#fff',
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  position: 'relative',
  textAlign: 'left',
  outline: 'none',
  overflowY: 'auto',
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: '2.8rem',
  marginBottom: theme.spacing(2),
  color: '#9146ff',
  marginBottom: "20px",
  paddingBottom: "20px",
  borderBottom: "12px solid darkgray",
}));

export const Header = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  marginBottom: theme.spacing(2),
  color: '#9146ff',
}));

export const Subheader = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

export const Paragraph = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  lineHeight: 1.5,
  marginBottom: theme.spacing(3),
}));

export const Quote = styled(Typography)(({ theme }) => ({
  fontStyle: 'italic',
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

export const BulletPoints = styled(List)(({ theme }) => ({
  fontFamily: '"Times New Roman"',
  listStyleType: 'disc',
  paddingLeft: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

export const ComponentContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const ProceedButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#9146ff',
  color: '#fff',
  padding: theme.spacing(1.5, 3),
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  '&:hover': {
    backgroundColor: '#773fe7',
  },
}));
