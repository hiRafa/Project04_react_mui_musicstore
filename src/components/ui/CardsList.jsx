import { Box } from "@mui/material";
import React from "react";
import { Fragment } from "react";
import Paginate from "./Paginate";
import Section from "./Section";

const CardsList = (props) => {
  return (
    <Fragment>
      <Section>
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
          {props.children}
        </Box>
      </Section>
      <Section>
        <Paginate pageCount={props.pageCount} />
      </Section>
    </Fragment>
  );
};

export default CardsList;
