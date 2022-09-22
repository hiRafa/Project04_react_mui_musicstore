import { Box } from "@mui/material";
import * as React from "react";
import GlobalContexts from "./context/global-contexts";
import CardPost from "./InnerContent/CardPost";
import NewsBackdrop from "./InnerContent/NewsBackdrop";
import NewsModal from "./InnerContent/NewsModal";
import NewsModalContent from "./InnerContent/NewsModalContent";
import NewsSlider from "./InnerContent/NewsSlider";
import BoxPages from "./ui/BoxPages";

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

      <section>
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
      </section>
      <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <CardPost />
        <CardPost />
        <CardPost />
        <CardPost />
        <CardPost />
        <CardPost />
      </Box>
    </BoxPages>
  );
};

export default HomePage;
