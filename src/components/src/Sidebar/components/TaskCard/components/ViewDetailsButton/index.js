// src/app/components/Sidebar/components/TaskCard/components/ViewDetailsButton/index.js

'use client';

import React from 'react';
import { Button, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PropTypes from 'prop-types';

const ViewDetailsButton = () => {
  const handleViewDetails = () => {
    // Implement the functionality to view task details
    console.log('View Details Clicked');
  };

  return (
    <Tooltip title="View Task Details" arrow>
      <Button
        variant="contained"
        size="small"
        startIcon={<VisibilityIcon />}
        onClick={handleViewDetails}
        sx={{
          marginTop: '15px',
          backgroundColor: '#1976D2',
          '&:hover': {
            backgroundColor: '#1565C0',
          },
        }}
        aria-label="View Task Details"
      >
        View Details
      </Button>
    </Tooltip>
  );
};

ViewDetailsButton.propTypes = {
  // Add prop types if needed
};

export default React.memo(ViewDetailsButton);
