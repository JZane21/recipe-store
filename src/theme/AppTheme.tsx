import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";

interface Props{
  children:JSX.Element
}

export const AppTheme = ({ children }:Props) => {

  const context:any = useContext(StoreContext);

  return (
    <ThemeProvider theme={!context.themeMode ? lightTheme : darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};