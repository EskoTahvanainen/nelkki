import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Button from './button';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
