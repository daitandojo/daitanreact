// src/app/components/Sidebar/components/TaskCard/components/Header/components/HeaderLocation/index.js

'use client';

import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PropTypes from 'prop-types';

const HeaderLocation = ({ location }) => {
  return (
    <Tooltip title="Location" arrow>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <LocationOnIcon color="action" fontSize="small" />
        <Typography variant="body2" sx={{ marginLeft: '5px' }}>
          {location}
        </Typography>
      </Box>
    </Tooltip>
  );
};

HeaderLocation.propTypes = {
  location: PropTypes.string.isRequired,
};

export default React.memo(HeaderLocation);
