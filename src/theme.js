import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    //purple theme
    primary: {
      main: "#3F31A3",
      dark: "#0F0A33",
      light: "#7260F7",
    },
    //yellow
    secondary: {
      main: "#F7DD39",
      dark: "#FFE77F",
      light: "#534B19",
    },
    whiteTheme: {
      main: "#fff",
    },
    blackTheme: {
      main: "#000",
    },
    greyTheme: {
      main: "#808080",
      light: "#D4D4D4",
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
