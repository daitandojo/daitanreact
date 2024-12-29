import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const StyledFunkyButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#9146ff',
  color: '#ffffff',
  padding: '10px 30px',
  fontSize: '18px',
  fontWeight: 'bold',
  borderRadius: '50px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
  textTransform: 'uppercase',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#ff8e73',
    boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.05)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
  animation: 'wiggle 2s infinite',

  // Keyframes for wiggle animation
  '@keyframes wiggle': {
    '0%, 100%': { transform: 'rotate(-3deg)' },
    '50%': { transform: 'rotate(3deg)' },
  },
}));