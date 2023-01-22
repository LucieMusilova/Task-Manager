import { FC } from "react";
import { Body } from "./components";
import { fetchData } from "./api/fetch";
import { theme } from "./theme/myTheme";
import { ThemeProvider } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    custom: Palette["primary"];
    neutral: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    custom?: PaletteOptions["primary"];
    neutral?: PaletteOptions["primary"];
  }
}

const App: FC = () => {
  fetchData();

  return (
    <ThemeProvider theme={theme}>
      <Body />
    </ThemeProvider>
  );
};

export default App;
