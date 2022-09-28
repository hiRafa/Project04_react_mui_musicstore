import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import ButtonClose from "../Custom/ButtonClose";
import GlobalContexts from "../context/global-contexts";
import classes from "./News.module.css";

import image00 from "./image-1.jpg";
import image01 from "./image-2.jpg";
import image02 from "./image-3.jpg";
import image03 from "./image-4.jpg";
import image04 from "./image-5.jpg";
import { Fragment } from "react";
import ArrowRight from "./ArrowRight";
import ArrowLeft from "./ArrowLeft";

const NewsModalContent = () => {
  const { currentIndex, recentNewsArray, setCurrentIndex } =
    useContext(GlobalContexts);

  // -------- CSS
  const imageNumber = () => {
    if (currentIndex === 0) {
      return image00;
      // slideImageNumberCSS = `${classes.slide0CSS}`;
    } else if (currentIndex === 1) {
      return image01;
      // slideImageNumberCSS = `${classes.slide1CSS}`;
    } else if (currentIndex === 2) {
      return image02;
      // slideImageNumberCSS = `${classes.slide2CSS}`;
    } else if (currentIndex === 3) {
      return image03;
      // slideImageNumberCSS = `${classes.slide3CSS}`;
    } else if (currentIndex === 4) {
      return image04;
      // slideImageNumberCSS = `${classes.slide4CSS}`;
    }
  };

  let newsTitle = recentNewsArray[currentIndex].title;
  let newsDescription = recentNewsArray[currentIndex].description;
  let newsBy = recentNewsArray[currentIndex].by;
  let newsReview = recentNewsArray[currentIndex].review;

  return (
    <Fragment>
      <Box className={classes.modal_content}>
        <div className={classes.modal_top}>
          <img src={imageNumber()} className={`${classes.modal_topImage}`} />
          <div className={classes.modal_topRight}>
            <Typography variant="h5">{newsTitle}</Typography>
            <Typography variant="p2">{newsBy}</Typography>
          </div>
        </div>
        <Typography variant="p2">{newsReview}</Typography>
        <div className={classes.modal_arrows}>
          <ArrowLeft />
          <ButtonClose txt="♥"></ButtonClose>
          <ButtonClose txt="Close"></ButtonClose>
          <ArrowRight />
        </div>
      </Box>
    </Fragment>
  );
};

export default NewsModalContent;
