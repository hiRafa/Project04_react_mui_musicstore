import React from "react";
import classes from "./News.module.css";

import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";
import NewsSlideItem from "./NewsSlideItem";

import { Box, styled } from "@mui/material";
import Section from "../ui/Section";

const BoxSliderCSS = styled(Box)({
  width: "400px",
  height: "400px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
});

const NewsSlider = () => {
  return (
    <Section className={classes.sliderBG}>
      <BoxSliderCSS>
        <ArrowLeft />
        <div className={classes.sliderContainer}>
          <NewsSlideItem />
        </div>
        <ArrowRight />
      </BoxSliderCSS>
    </Section>
  );
};

export default NewsSlider;
