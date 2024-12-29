import React, { useState, useEffect } from "react";

import { PopUpCenter, TabPanel } from "myreact";

import PopUpUserBasic from "./PopUpUserBasic";
import PopUpUserLocation from "./PopUpUserLocation";
import PopUpUserLogo from "./PopUpUserLogo";
// import PopUpUserActivity from "./PopUpUserActivity";

import { Avatar, Box } from "@mui/material";

import { useUser, useLanguage } from "myreact";
import { updateUserInDB } from "daitanjs/users";

import words from "./PopUpUser-language";

export default ({ onClose }) => {
  const { user, setUser } = useUser();
  const { currentLanguage } = useLanguage();

  const [shallowUser, setShallowUser] = useState(user);

  useEffect(() => {
    setShallowUser(user);
  }, [user]);

  const handleSaveUser = async (userToSave) => {
    console.log("SAVING USER: ");
    console.log(userToSave);
    const savedUser = await updateUserInDB(userToSave);
    setUser(savedUser);
  };

  const tabArray = [
    {
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          {words.Basic[currentLanguage]}
        </div>
      ),
      title: words.YourBasicData[currentLanguage],
      component: PopUpUserBasic,
      props: {
        shallowUser,
        setShallowUser,
        handleSaveUser,
      },
    },
    {
      label: words.Location[currentLanguage],
      title: words.WhatIsYourLocation[currentLanguage],
      component: PopUpUserLocation,
      props: {
        shallowUser,
        setShallowUser,
        handleSaveUser,
      },
    },
    {
      label: words.Logo[currentLanguage],
      title: words.YourLogo[currentLanguage],
      component: PopUpUserLogo,
      props: {
        shallowUser,
        setShallowUser,
        handleSaveUser,
      },
    },
  ];

  return (
    <PopUpCenter sx={{ width: "1000px" }} onClose={onClose}>
      <Box>
        {user?.profilepicture && (
          <div>
            <Avatar
              src={user?.profilepicture}
              sx={{
                position: "absolute",
                right: 50,
                top: 30,
                width: 60,
                height: 60,
              }}
            />
          </div>
        )}
        <TabPanel
          orientation="horizontal"
          tabArray={tabArray}
          onTabChange={() => handleSaveUser(shallowUser)}
        />
      </Box>
    </PopUpCenter>
  );
};
