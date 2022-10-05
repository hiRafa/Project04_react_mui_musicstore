import React, { useContext, Fragment } from "react";
import GlobalContexts from "../context/global-contexts";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";
import classes from "./News.module.css";
import NewsSlideItem from "./NewsSlideItem";
import background from "../../content/background.jpg";
import { Box, styled } from "@mui/material";
import Section from "../ui/Section";

const BoxSliderCSS = styled(Box)({
  width: "400px",
  height: "400px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
});

const NewsSlider = (props) => {
  const { recentNewsArray } = useContext(GlobalContexts);

  // console.log(recentNewsArray);

  // Parent Fetches data and passes to child only if the data is fetched, thus avoiding problems when rendering the component
  // I was having problems, because the data can not be fetched before the component is rendered, cause that's how react works
  // So one way is to make the parent render all data and then when it gets to rendering the child, the data is ready
  return (
    <Section className={classes.sliderBG}>
      <BoxSliderCSS>
        <ArrowLeft />
        <div
          className={classes.sliderContainer}
          // onClick={props.openModalHandler}
        >
          {/* This condition is really important, because the fetched data  'recentNewsArray' needs to be ready first before rendering the child */}
          <NewsSlideItem />
        </div>
        <ArrowRight />
      </BoxSliderCSS>
    </Section>
  );
};

export default NewsSlider;
