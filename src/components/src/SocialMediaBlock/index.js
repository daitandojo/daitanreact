import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { appName } from '@/app/config';

const SocialMediaBlock = () => (
  <Box mt={3}>
    <Box display="flex" alignItems="center" mb={1}>
      <IconButton href="https://twitter.com" target="_blank" aria-label="Twitter">
        <TwitterIcon />
      </IconButton>
      <Typography variant="body2">Twitter: @{appName.toLowerCase()}</Typography>
    </Box>
    <Box display="flex" alignItems="center" mb={1}>
      <IconButton href="https://facebook.com" target="_blank" aria-label="Facebook">
        <FacebookIcon />
      </IconButton>
      <Typography variant="body2">Facebook: facebook.com/{appName.toLowerCase()}</Typography>
    </Box>
    <Box display="flex" alignItems="center" mb={1}>
      <IconButton href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
        <LinkedInIcon />
      </IconButton>
      <Typography variant="body2">LinkedIn: linkedin.com/company/{appName.toLowerCase()}</Typography>
    </Box>
  </Box>
);

export default SocialMediaBlock;
