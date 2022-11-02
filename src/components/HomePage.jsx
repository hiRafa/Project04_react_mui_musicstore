import React, { useContext } from "react";
import GlobalContexts from "./context/global-contexts";
import CardsContext from "./context/cards-context";

import Backdrop from "./ui/Backdrop";
import NewsModal from "./ui/Modal";
import BoxPages from "./ui/BoxPages";
import CardsList from "./ui/CardsList";

import NewsModalContent from "./Homepage/NewsModalContent";
import NewsSlider from "./Homepage/NewsSlider";

const HomePage = () => {
  const { productsArray } = useContext(GlobalContexts);
  const { displayAllProducts, cardsPerPage, modalIsOpen, closeModalHandler } =
    useContext(CardsContext);

  let pageCount;
  if (productsArray) {
    pageCount = Math.ceil(productsArray.length / cardsPerPage);
  }

  return (
    <BoxPages>
      <NewsSlider />
      {modalIsOpen && (
        <NewsModal>
          <NewsModalContent />
        </NewsModal>
      )}
      {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}

      <CardsList pageCount={pageCount}>{displayAllProducts}</CardsList>
    </BoxPages>
  );
};

export default HomePage;
