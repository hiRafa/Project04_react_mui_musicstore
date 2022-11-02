import React, { useContext } from "react";
import CardsContext from "../context/cards-context";
import classes from "./News.module.css";
import ArrowCircleRightSharpIcon from "@mui/icons-material/ArrowCircleRightSharp";

const ArrowRight = () => {
  const { currentIndex, setCurrentIndex } = useContext(CardsContext);

  const toNext = () => {
    const lastSlide = currentIndex === 5 - 1;
    const newIndex = lastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <ArrowCircleRightSharpIcon
      sx={{ fontSize: "2.5rem" }}
      className={`${classes.arrow_base} ${classes.arrow_right}`}
      onClick={toNext}
    />
  );
};

export default ArrowRight;
