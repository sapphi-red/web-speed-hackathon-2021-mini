import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from './containers/AppContainer';

ReactDOM.render(
  <AppContainer />,
  document.getElementById('app'),
);

requestIdleCallback(() => {
  const $font = document.createElement('link')
  $font.rel = 'stylesheet'
  $font.href = '/fonts/webfont.css'
  document.head.append($font)

  // ナビゲーションバーで使われるフォント
  const criticalFonts = ['bold/000', 'bold/003', 'bold/010', 'bold/011', 'bold/013']
  for (const cf of criticalFonts) {
    const $preload = document.createElement('link')
    $preload.rel = 'preload'
    $preload.as = 'font'
    $preload.crossOrigin = ''
    $preload.href = `/fonts/genei-m-gothic/${cf}.woff2`
    document.head.append($preload)
  }
})
