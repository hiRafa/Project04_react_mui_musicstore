import { Box } from "@mui/material";
import * as React from "react";
import CardPost from "./InnerContent/CardPost";
import CarouselBoot from "./InnerContent/Carousel";
import BoxPages from "./ui/BoxPages";


const HomePage = () => {
  return (
    <BoxPages>
      <CarouselBoot />
      <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <CardPost />
        <CardPost />
        <CardPost />
      </Box>
    </BoxPages>
  );
};

export default HomePage;
