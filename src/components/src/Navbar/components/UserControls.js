'use client';

import { Box, Typography, Select, MenuItem, IconButton, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/navigation';

const UserControls = () => {
  const router = useRouter();

  return (
    <Box style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      {/* Tokens Display */}
      <Typography style={{ color: '#E3F2FD' }}>Tokens: 50</Typography>

      {/* Language Selector */}
      <Select
        defaultValue="ENG"
        style={{
          color: 'white',
          backgroundColor: '#1565C0',
          borderRadius: '5px',
          padding: '0 10px',
        }}
      >
        <MenuItem value="ENG">English</MenuItem>
        <MenuItem value="FR">French</MenuItem>
      </Select>

      {/* Account Icon */}
      <IconButton>
        <AccountCircleIcon style={{ color: 'white' }} />
      </IconButton>

      {/* Login Button */}
      <Button
        variant="outlined"
        size="small"
        onClick={() => router.push('/login')}
        style={{
          color: '#E3F2FD',
          borderColor: '#E3F2FD',
          textTransform: 'none',
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default UserControls;
