import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ChakraBaseProvider,
} from '@chakra-ui/react';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import MainRoutes from './routes/MainRoutes';
import { BrowserRouter } from 'react-router-dom';
import theme from './components/theme/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraBaseProvider theme={theme}>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
      </ChakraBaseProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
