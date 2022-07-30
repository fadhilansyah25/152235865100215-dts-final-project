import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Homepage from "./pages/Homepage";

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
        <Homepage />
      </ThemeProvider>
    </div>
  );
}

export default App;
