import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    // text: {
    //   primary: "#3c3c3c",
    //   secondary: "#ffffff"
    // },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: `#009bff`,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
      contrastText: `#ffffff`,
    },
    secondary: {
      // light: will be calculated from palette.secondary.main,
      main: `#cf77f3`,
      // dark: will be calculated from palette.secondary.main,
      contrastText: `#ffffff`,
    },
    error: {
      // light: will be calculated from palette.error.main,
      main: `#cb3066`,
      // dark: will be calculated from palette.error.main,
      contrastText: `#ffffff`,
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  shape: {
    borderRadius: 6,
  },
});

export default theme;
