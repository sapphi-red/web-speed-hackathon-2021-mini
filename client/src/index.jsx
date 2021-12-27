import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AppContainer } from './containers/AppContainer';

ReactDOM.render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,
  document.getElementById('app'),
);

requestIdleCallback(() => {
  const $font = document.createElement('link')
  $font.rel = 'stylesheet'
  $font.href = '/fonts/webfont.css'
  document.head.append($font)
})
