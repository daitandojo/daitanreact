import React, { useRef } from "react";
import { GeoCoder } from "myreact";

import { useUser, useLanguage } from "myreact";
import words from "./PopUpUser-language";

import { Box, Typography } from "@mui/material";

export default function PopUpUserLocation({
  shallowUser,
  setShallowUser,
  handleSaveUser,
}) {
  const { currentLanguage } = useLanguage();
  const LocationInputRef = useRef(null);

  const setUserLocation = (payload) => {
    const updatedShallowUser = {
      ...shallowUser,
      country: payload.country,
      location: payload.location,
      coordinates: [payload.longitude, payload.latitude],
    };
    console.log(updatedShallowUser);
    setShallowUser(updatedShallowUser);
    handleSaveUser(updatedShallowUser);
  };

  const startPayload = {
    location: shallowUser?.location || "",
    country: shallowUser?.country || "",
    latitude: shallowUser?.coordinates ? shallowUser?.coordinates[1] : 0,
    longitude: shallowUser?.coordinates ? shallowUser?.coordinates[0] : 0,
    anchors: [],
    onlineOnly: false,
    onlineOK: false,
  };

  return (
    <Box
      onBlur={() => alert("HELLO")}
      sx={{ padding: "30px", overflow: "hidden" }}
    >
      <Typography sx={{ marginBottom: "20px" }}>
        {words.LocationRequest[currentLanguage]}
      </Typography>
      <GeoCoder
        inputRef={LocationInputRef}
        language={currentLanguage}
        header={words.LocationPlaceholderShort[currentLanguage]}
        startPayload={startPayload}
        hasOnlineOptions={false}
        hasInputField={true}
        inputFieldDisabled={false}
        zoom={12}
        onInfoChange={setUserLocation}
      />
    </Box>
  );
}
