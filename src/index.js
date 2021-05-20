import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import State from './reducers/State';


ReactDOM.render(
    <State>
      <App />
    </State>,
  document.getElementById('root')
);

