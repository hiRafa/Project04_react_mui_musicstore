import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import ButtonClose from "../Custom/ButtonClose";
import GlobalContexts from "../context/global-contexts";
import classes from "./News.module.css";

const NewsModalContent = () => {
  const { currentIndex, recentNewsArray } = useContext(GlobalContexts);

  // -------- CSS
  let slideImageNumberCSS;
  if (currentIndex === 0) {
    slideImageNumberCSS = `${classes.slide0CSS}`;
  } else if (currentIndex === 1) {
    slideImageNumberCSS = `${classes.slide1CSS}`;
  } else if (currentIndex === 2) {
    slideImageNumberCSS = `${classes.slide2CSS}`;
  } else if (currentIndex === 3) {
    slideImageNumberCSS = `${classes.slide3CSS}`;
  } else if (currentIndex === 4) {
    slideImageNumberCSS = `${classes.slide4CSS}`;
  }

  let newsTitle = recentNewsArray[currentIndex].title;
  let newsDescription = recentNewsArray[currentIndex].description;
  let newsBy = recentNewsArray[currentIndex].by;
  let newsReview = recentNewsArray[currentIndex].review;

  return (
    <Box sx={{ display: " flex", flexDirection: "column" }}>
      <img className={`${classes.slideImageCSS} ${slideImageNumberCSS}`} />
      <Typography variant="h3">{newsTitle}</Typography>
      <Typography variant="p">{newsDescription}</Typography>
      <Typography variant="p2">{newsBy}</Typography>
      <Typography variant="p2">{newsReview}</Typography>
      <ButtonClose txt="♥"></ButtonClose>
      <ButtonClose txt="Close"></ButtonClose>
    </Box>
  );
};

export default NewsModalContent;
