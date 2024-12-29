import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { PopUpCenter, FlexCenter, UserEntry, useUser } from "myreact";
import { Box } from "@mui/material";

// Define the component with a function name to improve stack traces and debugging
function LoginPopup({ onClose, onLoginAborted }) {
  const { loggedIn, user, setUser } = useUser();

  // Redirect or prevent rendering if already logged in
  if (loggedIn) return null;

  return (
    <PopUpCenter onClose={onLoginAborted}>
      <FlexCenter>
        <Box sx={{ width: "450px", padding: "20px" }}>
          <UserEntry onEntryGranted={onClose} />
        </Box>
      </FlexCenter>
    </PopUpCenter>
  );
}

// Define propTypes for component props for type checking
LoginPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onLoginAborted: PropTypes.func.isRequired,
};

export default LoginPopup;
