import React, { useContext } from "react";
import { styled, Box, TextField, Autocomplete } from "@mui/material";
import GlobalContexts from "../context/global-contexts";

const SearchCustom = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  width: "50%",
}));

const AutocompleteCSS = styled(Autocomplete)({
  width: "100%",
});

const products = [
  { label: "Guitar", amount: "288" },
  {
    label: "Ukulele",
    amount: "129",
  },
];

const NavBarSearch = () => {
  const { productsArray } = useContext(GlobalContexts);

  const uniqueLabelsOnly = [];
  const oneOfEachItemForLabel = productsArray.filter((product) => {
    const isDuplicate = uniqueLabelsOnly.includes(product.label);

    if (!isDuplicate) {
      uniqueLabelsOnly.push(product.label);

      return true;
    }

    return false;
  });

  return (
    <SearchCustom>
      <AutocompleteCSS
        id="country-select-demo"
        options={oneOfEachItemForLabel}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {/* <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            /> */}
            {option.label} ({option.amount})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a product"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
    </SearchCustom>
  );
};

export default NavBarSearch;
