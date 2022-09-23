import { Box } from "@mui/material";
import * as React from "react";
import GlobalContexts from "./context/global-contexts";
import NewsBackdrop from "./Homepage/NewsBackdrop";
import NewsModal from "./Homepage/NewsModal";
import NewsModalContent from "./Homepage/NewsModalContent";
import NewsSlider from "./Homepage/NewsSlider";
import CardPost from "./ui/CardPost";
import BoxPages from "./ui/BoxPages";
import Section from "./ui/Section";
import Products from "./Homepage/Products";

const HomePage = () => {
  const { modalIsOpen, closeModalHandler } = React.useContext(GlobalContexts);

  return (
    <BoxPages>
      {modalIsOpen && (
        <NewsModal>
          <NewsModalContent />
        </NewsModal>
      )}
      {modalIsOpen && <NewsBackdrop onCancel={closeModalHandler} />}

      <Section>
        <Box
          sx={{
            width: "400px",
            height: "400px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <NewsSlider />
        </Box>
      </Section>
      <Section>
        <Products />
      </Section>
    </BoxPages>
  );
};

export default HomePage;
