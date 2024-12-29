// src/app/components/Sidebar/components/TaskCard/components/ProfessionalsCounter/index.js

'use client';

import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PropTypes from 'prop-types';

const ProfessionalsCounter = ({ professionals }) => {
  return (
    <Tooltip title={`${professionals} Professionals Viewing`} arrow>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <PersonIcon color="action" fontSize="small" />
        <Typography
          variant="body2"
          sx={{ marginLeft: '5px', color: '#555', fontWeight: '500' }}
        >
          {professionals}
        </Typography>
      </Box>
    </Tooltip>
  );
};

ProfessionalsCounter.propTypes = {
  professionals: PropTypes.number.isRequired,
};

export default React.memo(ProfessionalsCounter);
