import { Provider } from 'react-redux';
import store from './store/store';
import './App.css';
import SingleWeather from './components/SingleWeather';
import Header from './components/Header';
import {
  BrowserRouter as Router
} from 'react-router-dom';

function App() {
  return (
    <div>
    <Provider store={store} className="App">
      <Router>
        <Header/>
        <SingleWeather/>
      </Router>
    </Provider>
    </div>
  );
}

export default App;