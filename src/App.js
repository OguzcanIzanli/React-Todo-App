import Container from "./Components/Container";
import { ThemeProvider } from "./Components/Context/ThemeContext";

function App() {
  return (
    <ThemeProvider >
      <Container />
    </ThemeProvider>
  );
}

export default App;
