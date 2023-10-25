import { ThemeProvider } from './components/Providers/provider';
import './App.css';
import Main from './components/Main/main';

function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

export default App;
