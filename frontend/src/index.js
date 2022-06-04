import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap.min.css';
import { Provider } from "react-redux";
import store from './store'
import { BrowserRouter as Routes}  from 'react-router-dom'
import './index.css';
import App from './App';
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Routes>
      <Provider store={store}>
        <App />
      </Provider>
  </Routes>
);

