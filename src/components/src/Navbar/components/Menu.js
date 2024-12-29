import { Box, Select, MenuItem } from '@mui/material';

const Menu = () => {
  return (
    <Box style={{ display: 'flex', gap: '20px' }}>
      {['Professionals', 'Customers', 'Payments', 'About Us'].map((menu) => (
        <Select
          key={menu}
          defaultValue={menu}
          style={{
            color: 'white',
            backgroundColor: '#2D3748',
            borderRadius: '8px',
            padding: '5px',
          }}
        >
          <MenuItem value={menu}>{menu}</MenuItem>
          <MenuItem value={`${menu} Details`}>{`${menu} Details`}</MenuItem>
        </Select>
      ))}
    </Box>
  );
};

export default Menu;
