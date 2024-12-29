// src/app/components/Sidebar/components/TaskCard/components/Status/index.js

'use client';

import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PropTypes from 'prop-types';

const Status = ({ done }) => {
  return (
    <Tooltip title={done ? 'Task Completed' : 'Task Pending'} arrow>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {done ? (
          <CheckCircleIcon color="success" fontSize="small" />
        ) : (
          <HourglassEmptyIcon color="warning" fontSize="small" />
        )}
        <Typography
          variant="body2"
          sx={{ marginLeft: '5px', color: done ? '#4CAF50' : '#FF9800', fontWeight: '500' }}
        >
          {done ? 'Completed' : 'Pending'}
        </Typography>
      </Box>
    </Tooltip>
  );
};

Status.propTypes = {
  done: PropTypes.bool.isRequired,
};

export default React.memo(Status);
