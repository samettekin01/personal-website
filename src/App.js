import { ThemeProvider } from './components/providers/provider';
import './App.css';
import Main from './components/main/main';

function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

export default App;
