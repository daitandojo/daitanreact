import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function ControlledOpenSelect({
  productSet,
  product,
  setProduct
}) {

  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setProduct(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl sx={{ m: 0, minWidth: 250 }}>
      <InputLabel id="product">Tokens</InputLabel>
      <Select
        labelId="product"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={product}
        label="Number of Tokens"
        onChange={handleChange}
      >
        {productSet.map((item, index) => (
          <MenuItem key={index} value={index}>
            {`${item.quantity} Tokens - €${item.price * item.quantity}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ControlledOpenSelect;
