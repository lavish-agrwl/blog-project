import { useState, useEffect } from 'react'

import './App.css'
import store from './store/store'
import { Provider } from 'react-redux'

function App() {


  return (
    <Provider store={store}>
      <div>

      </div>
    </Provider>
  );
}

export default App
