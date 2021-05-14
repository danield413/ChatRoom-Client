import { AppRouter } from './router/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './css/app.css'
import 'animate.css';

function App() {

  return(
    <Provider store={ store }>
      <AppRouter />    
    </Provider>
  )
}

export default App;
