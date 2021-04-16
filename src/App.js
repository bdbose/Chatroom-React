import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Chat from './componnets/chat';
import Home from './componnets/home';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/chat/:id' exact component={Chat} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
