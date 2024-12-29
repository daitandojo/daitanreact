// src/app/components/Sidebar/components/TaskCard/components/Header/components/HeaderDate/index.js

'use client';

import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PropTypes from 'prop-types';

const HeaderDate = ({ date }) => {
  return (
    <Tooltip title="Posted Date" arrow>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <CalendarTodayIcon color="action" fontSize="small" />
        <Typography variant="body2" sx={{ marginLeft: '5px' }}>
          {date}
        </Typography>
      </Box>
    </Tooltip>
  );
};

HeaderDate.propTypes = {
  date: PropTypes.string.isRequired,
};

export default React.memo(HeaderDate);
