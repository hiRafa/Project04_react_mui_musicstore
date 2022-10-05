import React from "react";
import { useContext } from "react";
import GlobalContexts from "../context/global-contexts";
import classes from "./News.module.css";
import image00 from "./image-1.jpg";
import image01 from "./image-2.jpg";
import image02 from "./image-3.jpg";
import image03 from "./image-4.jpg";
import image04 from "./image-5.jpg";

const NewsSlideItemCard = () => {
  const { currentIndex, recentNewsArray, openModalHandler } =
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

  return (
    <div className={`${classes.slideCSS}`} onClick={openModalHandler}>
      <div className={classes.slideTopBlank}></div>
      <img
        src={imageNumber()}
        className={`${classes.slideImageCSS}`}
        alt={newsTitle}
      />
      <p className={classes.slideTitleCSS}>{newsTitle}</p>
    </div>
  );
};

export default NewsSlideItemCard;
