import { Box, styled } from "@mui/material";
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
  const { modalIsOpen, closeModalHandler } =
    useContext(GlobalContexts);

  return (
    <BoxPages>
      {modalIsOpen && (
        <NewsModal>
          <NewsModalContent />
        </NewsModal>
      )}
      {modalIsOpen && <NewsBackdrop onCancel={closeModalHandler} />}

      <NewsSlider />
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
