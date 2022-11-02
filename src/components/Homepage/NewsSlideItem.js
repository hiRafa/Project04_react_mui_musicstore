import React, { Fragment, useContext } from "react";
import CardsContext from "../context/cards-context";
import GlobalContexts from "../context/global-contexts";

import classes from "./News.module.css";

import NewsSlideItemCard from "./NewsSlideItemCard";
import AudiotrackSharpIcon from "@mui/icons-material/AudiotrackSharp";

const NewsSlideItem = () => {
  const { top5NewsArray } = useContext(GlobalContexts);
  const { currentIndex, setCurrentIndex } = useContext(CardsContext);
  console.log(top5NewsArray);
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <Fragment>
      {top5NewsArray && <NewsSlideItemCard />}

      <div className={classes.dotsContainerCSS}>
        {top5NewsArray.map((slide, slideIndex) => (
          <AudiotrackSharpIcon
            sx={{ fontSize: "2rem" }}
            key={slideIndex}
            className={`${classes.dotIcon} ${
              currentIndex === slideIndex ? classes.dotIconActive : ""
            }`}
            onClick={() => goToSlide(slideIndex)}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default NewsSlideItem;
