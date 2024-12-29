import React from "react";

import { PopUpCenter, Stripe } from "myreact";

import { Box } from "@mui/material";

export default ({ provider, show }) => {
  if (!show) return null;
  if (!provider) return null;

  const onClose = () => alert("Stripe closing");
  return (
    <PopUpCenter onClose={onClose}>
      <Box sx={{ padding: "20px", height: "600px" }}>
        <Stripe />
      </Box>
    </PopUpCenter>
  );
};
