import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import './styles/tailwind.dev.css'
import 'antd/dist/antd.css';
import App from './app/app';
import { AppProvider } from './app/context/AppContext';

ReactDOM.render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
  document.getElementById('root')
);
