import { Provider } from 'react-redux';
import store from './store/store';
import './App.css';
import SingleWeather from './components/SingleWeather';

function App() {
  return (
    <Provider store={store} className="App">
      <SingleWeather/>
    </Provider>
  );
}

export default App;