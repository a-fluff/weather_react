import { Provider } from 'react-redux';
import store from './store/store';
import './App.css';
import SingleWeather from './components/SingleWeather';
import {
  BrowserRouter as Router
} from 'react-router-dom';

function App() {
  return (
    <Provider store={store} className="App">
      <Router>
        <SingleWeather/>
      </Router>
    </Provider>
  );
}

export default App;