'use client';

import { AppBar, Toolbar, Box } from '@mui/material';
import Logo from './components/Logo';
import Menu from './components/Menu';
import UserControls from './components/UserControls';

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      style={{
        backgroundColor: '#1A202C',
        padding: '10px 20px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        borderBottom: '3px solid #2D3748',
      }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Logo />
        <Menu />
        <UserControls />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
