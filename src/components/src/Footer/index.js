import { Box, IconButton } from '@mui/material';
import { Facebook, LinkedIn, Instagram } from '@mui/icons-material';

function Footer() {
  return (
    <Box
      style={{
        backgroundColor: '#1A202C',
        padding: '20px',
        textAlign: 'center',
        color: 'white',
      }}
    >
      <Box>
        <IconButton>
          <Facebook style={{ color: 'white' }} />
        </IconButton>
        <IconButton>
          <LinkedIn style={{ color: 'white' }} />
        </IconButton>
        <IconButton>
          <Instagram style={{ color: 'white' }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Footer;
