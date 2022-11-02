import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import CardsContext from "./context/cards-context";
import GlobalContexts from "./context/global-contexts";

import BoxPages from "./ui/BoxPages";
import ButtonAll from "./ui/ButtonAll";
import CardsList from "./ui/CardsList";
import Section from "./ui/Section";

import ArticlesModalContent from "./Articles/ArticlesModalContent";

import { Typography } from "@mui/material";

const FavoritesPage = () => {
  const { userFavsArr, userInfo } = useContext(GlobalContexts);
  const { cardsPerPage, displayAllFavs } = useContext(CardsContext);

  let pageCount = Math.ceil(userFavsArr.length / cardsPerPage);

  return (
    <BoxPages>
      <Section>
        <Typography variant="h1" p={1}>
          Favorites
        </Typography>
      </Section>
      {userInfo ? (
        userFavsArr.length === 0 ? (
          <div>
            <Typography variant="h2" p={6}>
              Let's start adding new favorites
            </Typography>
            <NavLink to="/">
              <ButtonAll buttonTxt="Back to products page" />
            </NavLink>
          </div>
        ) : (
          <Fragment>
            <CardsList pageCount={pageCount}>{displayAllFavs}</CardsList>
            <ArticlesModalContent />
          </Fragment>
        )
      ) : (
        <div>
          <Typography variant="h2" p={6}>
            Log in to check your favorites!
          </Typography>
          <NavLink to="/logIn">
            <ButtonAll buttonTxt="Login Here!" />
          </NavLink>
        </div>
      )}
    </BoxPages>
  );
};

export default FavoritesPage;
