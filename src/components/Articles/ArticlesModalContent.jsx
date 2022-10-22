import { Box, Typography } from "@mui/material";
import React, { Fragment, useContext } from "react";
import GlobalContexts from "../context/global-contexts";
import ButtonFavorites from "../Custom/ButtonFavorites";
import ButtonClose from "../Custom/ButtonClose";
import classes from "../Homepage/News.module.css";
import CardsContext from "../context/cards-context";
import NewsBackdrop from "../ui/Backdrop";
import Modal from "../ui/Modal";

const ArticlesModalContent = () => {
  const { articlesArray } = useContext(GlobalContexts);
  const { cardIndex, modalIsOpen, closeModalHandler } =
    useContext(CardsContext);

  let modalContent;
  articlesArray.map((news) =>
    cardIndex === news.id
      ? (modalContent = (
          <Box className={classes.modal_content} key={news.id}>
            <div className={classes.modal_top}>
              <img src={news.img} className={`${classes.modal_topImage}`} />
              <div className={classes.modal_topRight}>
                <Typography variant="h5">{news.title}</Typography>
                <Typography variant="p2">{news.by}</Typography>
              </div>
            </div>
            <Typography variant="p2">{news.review}</Typography>
            <div className={classes.modal_arrows}>
              <ButtonFavorites keyForFavorites={news.id} />
              <ButtonClose txt="Close"></ButtonClose>
            </div>
          </Box>
        ))
      : ""
  );

  return (
    <Fragment>
      {modalIsOpen && (
        <Fragment>
          <Modal> {modalContent} </Modal>
          <NewsBackdrop onCancel={closeModalHandler} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ArticlesModalContent;
