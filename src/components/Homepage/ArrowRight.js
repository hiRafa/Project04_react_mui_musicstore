import React, { useContext } from "react";
import CardsContext from "../context/cards-context";
import classes from "./News.module.css";

const ArrowRight = () => {
  const { currentIndex, setCurrentIndex } = useContext(CardsContext);

  const toNext = () => {
    const lastSlide = currentIndex === 5 - 1;
    const newIndex = lastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div
      className={`${classes.arrow_base} ${classes.arrow_right}`}
      onClick={toNext}
    >
      →
    </div>
  );
};

export default ArrowRight;
