import React, { Fragment, useContext } from "react";
import CardsContext from "./context/cards-context";
import GlobalContexts from "./context/global-contexts";
import BoxPages from "./ui/BoxPages";
import CardsList from "./ui/CardsList";
import ArticlesModalContent from "./Articles/ArticlesModalContent";

const ArticlesPage = () => {
  const { articlesArray, userInfo } = useContext(GlobalContexts);
  const { displayAllArticles, cardsPerPage } = useContext(CardsContext);

  let pageCount;
  if (articlesArray) {
    pageCount = Math.ceil(articlesArray.length / cardsPerPage);
  }

  return (
    <BoxPages>
      <CardsList pageCount={pageCount}>{displayAllArticles}</CardsList>
      <ArticlesModalContent />
    </BoxPages>
  );
};

export default ArticlesPage;
