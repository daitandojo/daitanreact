// src/app/components/Sidebar/components/TaskCard/components/Header/index.js

'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

const Header = ({ title }) => {
  return (
    <Box>
      <Typography
        variant="h6"
        component="div"
        sx={{ fontWeight: 'bold', color: '#333' }}
      >
        {title}
      </Typography>
    </Box>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default React.memo(Header);
