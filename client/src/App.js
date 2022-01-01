import React from 'react';

import { Provider } from 'react-redux';
import store from './redux/store';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import Header from './components/Header';
import Toggle from './components/Toggle';

const App = () => {
  return (
    <Provider store={store}>
 <BrowserRouter>
 <Header />
 <Toggle />
        <Switch>
          <Route exact path='/' component={Home} />
        
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
