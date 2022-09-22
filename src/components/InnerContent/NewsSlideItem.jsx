import React, { Fragment, useContext } from "react";
import GlobalContexts from "../context/global-contexts";

import classes from "./News.module.css";

const NewsSlideItem = () => {
  const { currentIndex, setCurrentIndex, recentNewsArray, openModalHandler } =
    useContext(GlobalContexts);

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

  // ------------- Slides Array Order and Functionalities
  const slides = ["slide0", "slide1", "slide2", "slide3", "slide4"];

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  let newsTitle = recentNewsArray[currentIndex].title;

  return (
    <Fragment>
      <div className={`${classes.slideTopCSS}`} onClick={openModalHandler}>
        <img className={`${classes.slideImageCSS} ${slideImageNumberCSS}`} />
        <p>{newsTitle}</p>
      </div>

      <div className={classes.dotsContainerCSS}>
        {slides.map((slide, slideIndex) => (
          <p
            key={slideIndex}
            style={{
              fontSize: "1.5rem",
              margin: "0 3px",
              cursor: "pointer",
            }}
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
