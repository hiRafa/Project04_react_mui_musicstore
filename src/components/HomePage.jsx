import * as React from "react";
import GlobalContexts from "./context/global-contexts";
import Backdrop from "./ui/Backdrop";
import NewsModal from "./ui/Modal";
import NewsModalContent from "./Homepage/NewsModalContent";
import NewsSlider from "./Homepage/NewsSlider";
import BoxPages from "./ui/BoxPages";
import { useContext } from "react";
import CardsList from "./ui/CardsList";
import CardsContext from "./context/cards-context";

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
