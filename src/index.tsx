import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { lightTheme } from './DefaultTheme';

/* ThemeProvider
1. styled-components의 ThemeProvider 라이브러리를 이용해 css 속성을 props을 통해 전해줄 수 있다.
2. ex) props.theme.[속석명]
3. 대표적으로 색, background-color을 지정하여 white-mode, black-mode을 지정할 수 있다.
*/


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);