import React, { useState, useEffect } from "react";

import {
  Email,
  WhatsApp,
  Person3Rounded,
  RateReview,
} from "@mui/icons-material";

import { useLanguage } from "myreact";
import { getReviews } from "../../../helpers/reviews";

import { Box, Typography } from "@mui/material";
import { FlexCenter } from "myreact";

export default function RequestCardContact({ user }) {
  const { currentLanguage } = useLanguage();
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    const setReviews = async () => {
      const reviews = await getReviews({});
      let reviewsForUser = [];
      for (let r of reviews) {
        console.log(r?.user?.username);
        if (r?.user?._id === user._id) {
          reviewsForUser.push(r);
        }
      }
      setUserReviews(reviewsForUser);
    };
    setReviews();
  }, [user]);

  return (
    <Box
      sx={{
        width: "400px",
        margin: "35px auto",
        padding: "20px",
        border: "5px solid darkgreen",
        borderRadius: "25px",
        boxShadow: "5px 10px 10px black",
      }}
    >
      <FlexCenter>
        <Person3Rounded />
        <Typography sx={{ marginLeft: "10px" }}>
          {`${user?.firstname} ${user?.lastname}`}
        </Typography>
      </FlexCenter>
      <FlexCenter>
        <Email />
        <Typography sx={{ marginLeft: "10px" }}>{user?.email}</Typography>
      </FlexCenter>
      <FlexCenter>
        <WhatsApp />
        <Typography sx={{ marginLeft: "10px" }}>{user?.mobile}</Typography>
      </FlexCenter>
      <FlexCenter>
        <RateReview />
        <Typography sx={{ marginLeft: "10px" }}>
          Reviews: {userReviews.length}
        </Typography>
      </FlexCenter>
    </Box>
  );
}
