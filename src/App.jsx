import { ThemeProvider } from './components/Providers/Provider';
import './app.css';
import Main from './components/Main/Main';

function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

export default App;
