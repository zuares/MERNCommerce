import { BrowserRouter as Router } from 'react-router-dom';
import Pages from './components/MainPage/Pages';
import DataProvider from './GlobalState';
import Headers from './components/Headers/Headers';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className={`App`} >
          <Headers />
          <Pages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
