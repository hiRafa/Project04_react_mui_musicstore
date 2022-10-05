import React, { Fragment, useContext } from "react";
import GlobalContexts from "../context/global-contexts";

import classes from "./News.module.css";

import NewsSlideItemCard from "./NewsSlideItemCard";

const NewsSlideItem = () => {
  const { currentIndex, setCurrentIndex, recentNewsArray } =
    useContext(GlobalContexts);

  // ------------- Slides Array Order and Functionalities
  const slides = ["slide0", "slide1", "slide2", "slide3", "slide4"];

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <Fragment>
      {recentNewsArray && <NewsSlideItemCard />}

      <div className={classes.dotsContainerCSS}>
        {slides.map((slide, slideIndex) => (
          <p
            key={slideIndex}
            className={`${classes.dotIcon} ${
              currentIndex === slideIndex ? classes.dotIconActive : ""
            }`}
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
