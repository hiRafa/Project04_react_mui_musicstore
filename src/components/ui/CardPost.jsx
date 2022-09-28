import React, { Fragment, useContext } from "react";
import {
  styled,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Checkbox,
} from "@mui/material";

import { Favorite, FavoriteBorder } from "@mui/icons-material";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";

import { theme } from "../../theme";
import GlobalContexts from "../context/global-contexts";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import classes from "./ui.module.css";

const label = { inputProps: { "aria-label": "Checkbox " } };
const CardCSS = styled(Card)({
  width: 300,
  height: "100%",
  maxHeight: 600,
});
const CardContentCSS = styled(CardContent)({
  maxHeight: "20%",
  overflow: "hidden",
});
const CheckboxCSS = styled(Checkbox)({
  color: `${theme.palette.greyTheme.main}`,
  ":hover": {
    color: `${theme.palette.secondary.main}`,
    cursor: "pointer",
    transition: "all 0.25s linear",
  },
});
const CardActionsCSS = styled(CardActions)({
  display: "flex",
  justifyContent: "space-between",
});

const CardPost = (props) => {
  const { productsArray } = useContext(GlobalContexts);
  const [pageNumber, setPageNumber] = useState(0);

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

  // Mapping over productsArray data creating a card for each produt
  // const productCard = productsArray.map((product) => (
  const productsPerPage = 4;
  const totalOfProductsTilPerviousPage = pageNumber * productsPerPage;

  const displayCurrentProducts = productsArray
    .slice(
      totalOfProductsTilPerviousPage,
      totalOfProductsTilPerviousPage + productsPerPage
    )
    .map((product) => (
      <CardCSS key={product.id}>
        <CardHeader
          title={capitalizeFunction(product.name)}
          subheader={capitalize1Letter(product.type)}
        />
        <Typography p="0 1rem 1rem">{product.price}</Typography>
        <CardMedia
          component="img"
          height="194"
          alt={productsArray.type}
          src={`${product.img}`}
        />
        <CardContentCSS>
          <Typography variant="body2">
            {capitalize1Letter(product.description)}
          </Typography>
        </CardContentCSS>
        <CardActionsCSS disableSpacing>
          <div>
            <CheckboxCSS
              {...label}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
            />
          </div>
          <IconButton aria-label="add to cart">
            <AddShoppingCartRoundedIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        </CardActionsCSS>
      </CardCSS>
    ));

  // round up the equation result with Math.ceil. and Math.floor rounds down.
  const pageCount = Math.ceil(productsArray.length / productsPerPage);

  // destructuring ReactPaginate because this function will be called inside ReactPaginate Component ↓ and get the "selected"
  const changePageHandler = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Fragment>
      {displayCurrentProducts}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePageHandler}
        containerClassName={classes.paginationButtons}
        previousLinkClassName={classes.paginationPreviousButton}
        nextLinkClassName={classes.paginationNextButton}
        disabledClassName={classes.paginationDisabled}
        activeClassName={classes.paginationActive}
      />
    </Fragment>
  );
};

export default CardPost;
