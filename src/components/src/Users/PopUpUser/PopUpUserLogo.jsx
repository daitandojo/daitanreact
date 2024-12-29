import React from "react";
import { Crop, FlexCenter } from "myreact";
import { uploadImageByAPI } from "daitanjs/imagesByAPI";
import { Box, Typography } from "@mui/material";
import words from "./PopUpUser-language";
import { useLanguage } from "myreact";

const PopUpUserLogo = ({ shallowUser, setShallowUser, handleSaveUser }) => {
  const { currentLanguage } = useLanguage();

  const handleCroppedImage = async (imageSrc) => {
    try {
      const url = await uploadImageByAPI(imageSrc);
      const updatedUser = { ...shallowUser, profilepicture: url };
      setShallowUser(updatedUser);
      handleSaveUser(updatedUser);
    } catch (error) {
      console.error("Error uploading and saving the cropped image:", error);
      // Handle the error, show user feedback, etc.
    }
  };

  return (
    <Box sx={{ margin: "20px" }}>
      <Typography sx={{ margin: "30px" }}>
        {words.LogoRequest[currentLanguage]}
      </Typography>
      <FlexCenter>
        <Box sx={{ width: "500px" }}>
          <Crop
            cropShape="round"
            startImage={shallowUser?.profilepicture}
            onceCropped={handleCroppedImage}
          />
        </Box>
      </FlexCenter>
    </Box>
  );
};

export default PopUpUserLogo;
