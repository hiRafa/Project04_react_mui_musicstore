// Found a better way to create pagination with ReactPaginate tutorial on youtube.
// This is a raw version of how to make pagination and use classNames library

// // this comes from npm add classNames to help avoid ternary operators and make more simple code for CSS with booleans
// // see the li example classNames method()
// import classNames from "classnames";
// import React from "react";
// // import classes from "./Products.module.css";
// import "./Products.css";
// // This is a helper function to create an array with numbers from 1 ~ Maximum amount of pages
// const rangeHelperFunction = (start, end) => {
//   return [...Array(end).keys()].map((el) => el + start);
// };

// // Li item, can be moved to another component file
// const PaginationItem = ({ page, onPageChange, currentPage }) => {
//   const liClasses = classNames({
//     page_item: true,
//     active: page === currentPage,
//     disabled: page !== currentPage,
//   });
//   return (
//     <li
//       className={`page_link ${liClasses} `}
//       onClick={() => onPageChange(page)}
//     >
//       {page}
//     </li>
//   );
// };

// const ProductsPagination = ({
//   currentPage,
//   itemsTotal,
//   itemsOnPage,
//   onPageChange,
// }) => {
//   const pagesCount = Math.ceil(itemsTotal / itemsOnPage);
//   const pages = rangeHelperFunction(1, pagesCount);
//   // console.log(pagesCount, pages);

//   return (
//     <ul className="pagination">
//       {pages.map((page) => (
//         <PaginationItem
//           page={page}
//           key={page}
//           onPageChange={onPageChange}
//           currentPage={currentPage}
//         />
//       ))}
//     </ul>
//   );
// };

// export default ProductsPagination;
