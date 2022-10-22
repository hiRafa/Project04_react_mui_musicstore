import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import ButtonClose from "../Custom/ButtonClose";
import GlobalContexts from "../context/global-contexts";
import classes from "./News.module.css";

import { Fragment } from "react";
import ArrowRight from "./ArrowRight";
import ArrowLeft from "./ArrowLeft";
import ButtonFavorites from "../Custom/ButtonFavorites.jsx";
import CardsContext from "../context/cards-context";

const NewsModalContent = () => {
  const { top5NewsArray } = useContext(GlobalContexts);
  const { currentIndex } = useContext(CardsContext);

  let newsTitle = top5NewsArray[currentIndex].title;
  let newsBy = top5NewsArray[currentIndex].by;
  let newsReview = top5NewsArray[currentIndex].review;
  let newsID = top5NewsArray[currentIndex].id;
  let newsImage = top5NewsArray[currentIndex].img;

  return (
    <Fragment>
      <Box className={classes.modal_content} key={newsID}>
        <div className={classes.modal_top}>
          <img src={newsImage} className={`${classes.modal_topImage}`} />
          <div className={classes.modal_topRight}>
            <Typography variant="h5">{newsTitle}</Typography>
            <Typography variant="p2">{newsBy}</Typography>
          </div>
        </div>
        <Typography variant="p2">{newsReview}</Typography>
        <div className={classes.modal_arrows}>
          <ArrowLeft />
          <ButtonFavorites keyForFavorites={newsID} />
          <ButtonClose txt="Close"></ButtonClose>
          <ArrowRight />
        </div>
      </Box>
    </Fragment>
  );
};

export default NewsModalContent;
