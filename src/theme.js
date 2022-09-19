import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    //purple theme
    primary: {
      main: "#3F33B3",
      dark: "#1B1266",
      light: "#6E61FF",
    },
    //yellow
    secondary: {
      main: "#FFDD14",
      light: "#FFE447",
      dark: "#6E5F09",
    },
    whiteTheme: {
      main: "#fff",
    },
    blackTheme: {
      main: "#000",
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
