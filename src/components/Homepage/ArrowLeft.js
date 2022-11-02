import React, { useContext } from "react";
import CardsContext from "../context/cards-context";
import classes from "./News.module.css";

import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";

const ArrowLeft = () => {
  const { currentIndex, setCurrentIndex } = useContext(CardsContext);

  const toPrevious = () => {
    const firstSlide = currentIndex === 0;
    const newIndex = firstSlide ? 5 - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  return (
    <ArrowCircleLeftSharpIcon
      sx={{ fontSize: "2.5rem" }}
      className={`${classes.arrow_base} ${classes.arrow_left}`}
      onClick={toPrevious}
    />
  );
};

export default ArrowLeft;
