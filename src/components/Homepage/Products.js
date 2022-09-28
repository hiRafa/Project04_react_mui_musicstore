import { Box } from "@mui/material";
import React, { Fragment, useContext } from "react";
import GlobalContexts from "../context/global-contexts";
import CardPost from "../ui/CardPost";

const Products = (props) => {
  const { productsArray } = useContext(GlobalContexts);

  return (
    <Fragment>
      {productsArray ? (
        <Box
          sx={{
            width: "90%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <CardPost />
        </Box>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default Products;
