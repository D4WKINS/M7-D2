import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import CakeContainer from '../src/components/CakeContainer.jsx';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
    <CakeContainer/>
    </div>
    </Provider>
   
  );
}

export default App;
