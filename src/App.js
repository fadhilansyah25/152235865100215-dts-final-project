import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Routers from "./routers";

const theme = createTheme({
  palette: { mode: "dark" },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

function App() { 
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routers/>
      </ThemeProvider>
    </div>
  );
}

export default App;
