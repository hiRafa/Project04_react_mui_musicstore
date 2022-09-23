import { Box } from "@mui/material";
import React from "react";
import CardPost from "../ui/CardPost";
import classes from "./Products.module.css";

const Products = () => {
  return (
    <Box
      sx={{
        width: "400px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <CardPost />
      <CardPost />
      <CardPost />
      <CardPost />
      <CardPost />
      <CardPost />
      <CardPost />
      <CardPost />
      <CardPost />
      <CardPost />
      <CardPost />
    </Box>
  );
};

export default Products;
