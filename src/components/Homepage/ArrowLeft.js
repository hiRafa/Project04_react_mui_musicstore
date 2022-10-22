import React, { useContext } from "react";
import CardsContext from "../context/cards-context";
import classes from "./News.module.css";

const ArrowLeft = () => {
  const { currentIndex, setCurrentIndex } = useContext(CardsContext);

  const toPrevious = () => {
    const firstSlide = currentIndex === 0;
    const newIndex = firstSlide ? 5 - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div
      className={`${classes.arrow_base} ${classes.arrow_left}`}
      onClick={toPrevious}
    >
      ←
    </div>
  );
};

export default ArrowLeft;
