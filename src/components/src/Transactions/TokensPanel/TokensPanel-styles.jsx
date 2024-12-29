import { styled } from '@mui/material/styles';

export const PanelContainer = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: "flex",
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
}));

export const TokensTitle = styled('div')(({ theme }) => ({
  fontFamily: "Shadows Into Light",
  fontSize: "34px",
}));

export const Tokens = styled('div')(({ theme }) => ({
  margin: "0 auto",
  textAlign: "center",
  fontSize: "52px",
}));

export const RadioGroup = styled('div')(({ theme }) => ({
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
  padding: "25px",
}));

export const StripeModal = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '600px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
}));

export const StripeContent = styled('div')(({ theme }) => ({
  position: "relative",
  width: '570px',
  height: '600px',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '5px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
}));

export const CloseButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  border: 'none',
  color: "darkgray",
  background: 'transparent',
  cursor: 'pointer',
  fontSize: '18px',
}));