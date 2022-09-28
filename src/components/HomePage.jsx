import { Box } from "@mui/material";
import * as React from "react";
import GlobalContexts from "./context/global-contexts";
import NewsBackdrop from "./Homepage/NewsBackdrop";
import NewsModal from "./Homepage/NewsModal";
import NewsModalContent from "./Homepage/NewsModalContent";
import NewsSlider from "./Homepage/NewsSlider";
import BoxPages from "./ui/BoxPages";
import Section from "./ui/Section";
import Products from "./Homepage/Products";
import ProductsPagination from "./tests-and-fails/ProductsPagination";
import { useContext } from "react";
import ReactPaginate from "react-paginate";

const HomePage = () => {
  const { modalIsOpen, closeModalHandler, currentPage, setCurrentPage } =
    useContext(GlobalContexts);

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
        {/* <ProductsPagination
          currentPage={currentPage}
          itemsTotal={55}
          itemsOnPage={5}
          onPageChange={(page) => setCurrentPage(page)}
        /> */}
      </Section>
    </BoxPages>
  );
};

export default HomePage;
