import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import axios from 'axios';

const App = () => {

  const movies =async ()=>{
   const res= await axios.get(`https://imdb-api.com/en/API/Top250Movies/k_vxjqgq7w`); 
   let results= res.data.items
  
    console.log(results)



  
  } 
movies()
  return (
    <Provider store={store}>
<div>My app</div>
    </Provider>
  );
}

export default App;
