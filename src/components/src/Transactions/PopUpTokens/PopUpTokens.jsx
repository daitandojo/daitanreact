import React from "react";

import { PopUpCenter } from "myreact";

import TokensPanel from "../TokensPanel/TokensPanel";

import { Box } from "@mui/material";

export default ({ onPaid = () => {}, onClose }) => {
  return (
    <PopUpCenter onClose={onClose}>
      <Box sx={{ padding: "20px", height: "500px" }}>
        <TokensPanel onPaid={onPaid} />
      </Box>
    </PopUpCenter>
  );
};
