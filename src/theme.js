import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1B1266",
      dark: "#3F33B3",
      light: "#6A5BEF",
    },
    secondary: {
      main: "#FAD914",
      light: "#FFE447",
    },
    whiteTheme: {
      main: "#fff",
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 800,
      lg: 1280,
      xl: 1800,
    },
  },

  // components: {
  //   MuiListItemIcon: {
  //     styleOverrides: {
  //       root: {
  //         fill: "#FAD914",
  //       },
  //     },
  //   },
  // },
});
