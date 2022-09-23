import React, { Fragment, useContext } from "react";
import GlobalContexts from "../context/global-contexts";

import classes from "./News.module.css";
import image00 from "./image-1.jpg";
import image01 from "./image-2.jpg";
import image02 from "./image-3.jpg";
import image03 from "./image-4.jpg";
import image04 from "./image-5.jpg";

const NewsSlideItem = () => {
  const { currentIndex, setCurrentIndex, recentNewsArray, openModalHandler } =
    useContext(GlobalContexts);

  // -------- CSS
  let slideImageNumberCSS;
  let alt;
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

  // ------------- Slides Array Order and Functionalities
  const slides = ["slide0", "slide1", "slide2", "slide3", "slide4"];

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  let newsTitle = recentNewsArray[currentIndex].title;

  return (
    <Fragment>
      <div className={`${classes.slideTopCSS}`} onClick={openModalHandler}>
        <div className={classes.slideTopBlank}></div>
        <img
          src={imageNumber()}
          className={`${classes.slideImageCSS}`}
          alt={newsTitle}
        />
        <p className={classes.slideTitleCSS}>{newsTitle}</p>
      </div>

      <div className={classes.dotsContainerCSS}>
        {slides.map((slide, slideIndex) => (
          <p
            key={slideIndex}
            className={classes.dotIcon}
            onClick={() => goToSlide(slideIndex)}
          >
            ♪
          </p>
        ))}
      </div>
    </Fragment>
  );
};
// {recentNewsArray.map((news) => (
//     <p className={classes.slideTitleCSS} key={news.id}>
//       {news.title}
//     </p>
//   ))}

export default NewsSlideItem;
