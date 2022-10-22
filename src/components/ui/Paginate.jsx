import React from "react";
import { useContext } from "react";
import { Fragment } from "react";
import ReactPaginate from "react-paginate";
import CardsContext from "../context/cards-context";
import classes from "./ui.module.css";

const Paginate = (props) => {
  const { setPageNumber } = useContext(CardsContext);

  // destructuring ReactPaginate because this function will be called inside ReactPaginate Component ↓ and get the "selected"
  const changePageHandler = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Fragment>
      <ReactPaginate
        previousLabel={"←"}
        previousClassName={classes.previous}
        nextLabel={"→"}
        nextClassName={classes.previous}
        pageCount={props.pageCount}
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

export default Paginate;
