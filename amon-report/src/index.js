// General imports
import React from 'react';
import ReactDOM from 'react-dom';

// Style imports
import './components/css/theme.css';

// Component imports
import { App } from './components';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
