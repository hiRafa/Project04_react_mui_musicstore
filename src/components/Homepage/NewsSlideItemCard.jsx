import React, { useContext, Fragment } from "react";
import GlobalContexts from "../context/global-contexts";
import CardsContext from "../context/cards-context";
import classes from "./News.module.css";

const NewsSlideItemCard = () => {
  const { top5NewsArray } = useContext(GlobalContexts);
  const { currentIndex, openModalHandler } = useContext(CardsContext);
  // console.log(top5NewsArray);
  // console.log(currentIndex);

  return (
    <Fragment>
      {top5NewsArray[currentIndex] ? (
        <div
          className={`${classes.slideCSS}`}
          onClick={openModalHandler}
          key={top5NewsArray[currentIndex].id}
        >
          <img
            src={top5NewsArray[currentIndex].img}
            className={`${classes.slideImageCSS}`}
            alt={top5NewsArray[currentIndex].title}
          />
          <p className={classes.slideTitleCSS}>
            {top5NewsArray[currentIndex].title}
          </p>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default NewsSlideItemCard;
