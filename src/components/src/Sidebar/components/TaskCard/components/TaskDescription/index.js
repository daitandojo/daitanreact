// src/app/components/Sidebar/components/TaskCard/components/TaskDescription/index.js

'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

const TaskDescription = ({ description }) => {
  return (
    <Box sx={{ marginTop: '15px' }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ lineHeight: '1.6', color: '#555' }}
      >
        {description}
      </Typography>
    </Box>
  );
};

TaskDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export default React.memo(TaskDescription);
