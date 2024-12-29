'use client';

import { Typography } from '@mui/material';

const Logo = () => (
  <Typography
    variant="h2"
    sx={{
      display: 'inline-block',
      fontFamily: "'Pacifico', cursive",
      fontWeight: 400,
      textTransform: 'none',
      cursor: 'pointer',
      background: 'linear-gradient(120deg, #4A90E2 0%, #7F53AC 50%, #C13584 100%)',
      color: 'transparent',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      transition: 'transform 0.4s ease, text-shadow 0.4s ease',
      textShadow: '0 0 10px rgba(0,0,0,0.3)',
      fontSize: '4.2rem',
      '&:hover': {
        transform: 'scale(1.1) rotate(-2deg)',
        textShadow: '0 0 20px rgba(0,0,0,0.4)',
      },
    }}
  >
    Haelpers
  </Typography>
);

export default Logo;
