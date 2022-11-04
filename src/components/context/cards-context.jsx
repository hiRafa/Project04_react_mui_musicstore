import React, { useContext, useState, createContext, useEffect } from "react";
import {
  styled,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
} from "@mui/material";

import GlobalContexts from "../context/global-contexts";
import CartContext from "./cart-context";
import classes from "./context.module.css";

import ButtonFavorites from "../Custom/ButtonFavorites";
import ButtonCartAdd from "../Custom/ButtonCartAdd";

const CardsContext = createContext("");

const CardCSS = styled(Card)({
  width: "80%",
  minWidth: 200,
  maxWidth: 300,
  maxHeight: 500,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});
const CardContentCSS = styled(CardContent)({
  maxHeight: 50,
  overflow: "hidden",
});

const CardActionsCSS = styled(CardActions)({
  display: "flex",
  justifyContent: "space-between",
  padding: ".5rem",
});

export function CardsContextProvider(props) {
  const { productsArray, userFavsArr, articlesArray, top5NewsArray } =
    useContext(GlobalContexts);

  // console.log(productsArray);
  // console.log(userFavsArr);
  // console.log(articlesArray);

  const [pageNumber, setPageNumber] = useState(0);

  // ---------------------  Articles and News Slider
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const closeModalHandler = () => {
    setmodalIsOpen(false);
  };
  const openModalHandler = () => {
    setmodalIsOpen(true);
    console.log(cardIndex);
  };

  // --------------------- PRODUCTS Data and Cards
  // Mapping over productsArray data creating a card for each product
  // const productCard = productsArray.map((product) => (
  const cardsPerPage = 4;
  const totalCardsPreviousPage = pageNumber * cardsPerPage;
  const totalCardsTilCurrentPage = totalCardsPreviousPage + cardsPerPage;

  let displayAllProducts, displayAllArticles, displayAllFavs;
  let allIDsArrayFavs = [];
  let productsArrayFavs = [];
  let articlesArrayFavs = [];

  if (productsArray && articlesArray && top5NewsArray) {
    // Capitalize first letter of every word for titles and subtitles
    let capitalizeArr;
    const capitalizeFunction = (txt) => {
      capitalizeArr = txt.split(" ");
      for (let i = 0; i < capitalizeArr.length; i++) {
        capitalizeArr[i] =
          capitalizeArr[i].charAt(0).toUpperCase() + capitalizeArr[i].slice(1);
      }
      return (txt = capitalizeArr.join(" "));
    };

    // Capitalize first letter for paragraph
    const capitalize1Letter = (txt) => {
      return txt.charAt(0).toUpperCase() + txt.slice(1);
    };

    // Create an array with all favorites products objects by filtering with the user favorites array of ids
    const pushIDsToArrays = (arrayLength, favArray1) => {
      for (let i = 0; i < arrayLength.length; i++) {
        // console.log(displayAllProducts[i].key);
        // console.log(arrayLength[i]);
        if (userFavsArr.includes(arrayLength[i].id)) {
          // favArray1.push(arrayLength[i]);
          allIDsArrayFavs.push(arrayLength[i]);
        }
      }
    };
    pushIDsToArrays(productsArray);
    pushIDsToArrays(articlesArray);
    productsArray.map((products) => productsArrayFavs.push(products.id));
    articlesArray.map((articles) => articlesArrayFavs.push(articles.id));
    // console.log(productsArrayFavs);
    // console.log(articlesArrayFavs);
    // console.log(
    //   allIDsArrayFavs.slice(totalCardsPreviousPage, totalCardsTilCurrentPage)
    // );
    // console.log(productsArrayFavs);
    // console.log(articlesArrayFavs);

    displayAllProducts = productsArray
      .slice(totalCardsPreviousPage, totalCardsTilCurrentPage)
      .map((product, key) => (
        <CardCSS key={product.id}>
          <CardHeader
            title={capitalizeFunction(product.name)}
            subheader={capitalize1Letter(product.label)}
          />
          <Typography p="0 1rem 1rem">{`¥${product.price.toFixed(
            3
          )} `}</Typography>
          <CardMedia
            component="img"
            height="194"
            alt={productsArray.label}
            src={`${product.img}`}
          />
          <CardContentCSS>
            <Typography variant="body2">
              {capitalize1Letter(product.description)}
            </Typography>
          </CardContentCSS>
          <CardActionsCSS disableSpacing>
            <ButtonFavorites keyForFavorites={`${product.id}`} />
            <ButtonCartAdd
              id={product.id}
              name={product.name}
              price={product.price}
              img={product.img}
            />
          </CardActionsCSS>
        </CardCSS>
      ));

    // ----------------  Articles cards
    // mapping all
    let dateFormated;
    const dateFormatting = (date) => {
      dateFormated = [...date];
      dateFormated.splice(4, 0, ".");
      dateFormated.splice(7, 0, ".");
      return dateFormated.join("");
    };

    displayAllArticles = articlesArray
      .slice(totalCardsPreviousPage, totalCardsTilCurrentPage)
      .map((news) => (
        <CardCSS
          key={news.id}
          onClick={() => {
            setCardIndex(news.id);
          }}
        >
          <Box
            className={classes.cardCSS_articles}
            onClick={() => {
              openModalHandler();
            }}
          >
            <CardMedia
              component="img"
              height="194"
              alt={articlesArray.title}
              src={`${news.img}`}
            />
            <Typography variant="p" component="h1" p="1rem">
              {capitalizeFunction(news.title)}
            </Typography>
            <Typography
              variant="p"
              component="h4"
              p="0 1rem 1rem"
            >{`by: ${capitalize1Letter(news.by)}`}</Typography>
            <Typography variant="p" component="h4" p="0 1rem 1rem">
              {dateFormatting(news.date)}
            </Typography>
          </Box>
          <CardActionsCSS disableSpacing>
            <ButtonFavorites keyForFavorites={`${news.id}`} />
          </CardActionsCSS>
        </CardCSS>
      ));
    // console.log(displayAllArticles);

    displayAllFavs = allIDsArrayFavs
      .slice(totalCardsPreviousPage, totalCardsTilCurrentPage)
      .map((favs) =>
        productsArrayFavs.includes(favs.id) ? (
          <CardCSS key={favs.id}>
            <CardHeader
              title={capitalizeFunction(favs.name)}
              subheader={capitalize1Letter(favs.label)}
            />
            <Typography p="0 1rem 1rem">{`¥${favs.price.toFixed(
              3
            )} `}</Typography>
            <CardMedia
              component="img"
              height="194"
              alt={favs.label}
              src={`${favs.img}`}
            />
            <CardContentCSS>
              <Typography variant="body2">
                {capitalize1Letter(favs.description)}
              </Typography>
            </CardContentCSS>
            <CardActionsCSS disableSpacing>
              <ButtonFavorites keyForFavorites={`${favs.id}`} />
              <ButtonCartAdd
                id={favs.id}
                name={favs.name}
                price={favs.price}
                img={favs.img}
              />
            </CardActionsCSS>
          </CardCSS>
        ) : (
          articlesArrayFavs.includes(favs.id) && (
            <CardCSS
              key={favs.id}
              onClick={() => {
                setCardIndex(favs.id);
              }}
            >
              <Box
                className={classes.cardCSS_articles}
                onClick={() => {
                  openModalHandler();
                }}
              >
                <CardMedia
                  component="img"
                  height="194"
                  alt={articlesArray.title}
                  src={`${favs.img}`}
                />
                <Typography variant="p" component="h1" p="1rem">
                  {capitalizeFunction(favs.title)}
                </Typography>
                <Typography
                  variant="p"
                  component="h4"
                  p="0 1rem 1rem"
                >{`by: ${capitalize1Letter(favs.by)}`}</Typography>
                <Typography variant="p" component="h4" p="0 1rem 1rem">
                  {dateFormatting(favs.date)}
                </Typography>
              </Box>
              <CardActionsCSS disableSpacing>
                <ButtonFavorites keyForFavorites={`${favs.id}`} />
              </CardActionsCSS>
            </CardCSS>
          )
        )
      );

    // console.log(productsArrayFavs);
    // console.log(displayFavProducts);
    // console.log(displayAllProducts);
    // console.log(articlesArray);
  }

  return (
    <CardsContext.Provider
      value={{
        currentPage,
        setCurrentPage,

        currentIndex,
        setCurrentIndex,

        modalIsOpen,
        setmodalIsOpen,
        openModalHandler,
        closeModalHandler,
        cardIndex,
        setCardIndex,

        cardsPerPage,
        setPageNumber,

        displayAllProducts,
        displayAllArticles,
        displayAllFavs,
      }}
    >
      {props.children}
    </CardsContext.Provider>
  );
}

export default CardsContext;
