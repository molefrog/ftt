import { injectGlobal } from 'styled-components'

// This file contains global application styles
// such as typography settings and fonts

injectGlobal`
  @font-face {
    font-family: 'RickRoll';
    src: url('./fonts/Rick.ttf');
    font-weight: 500;
  }

  @font-face {
    font-family: 'RickRoll';
    src: url('./fonts/RickMedium.ttf');
    font-weight: 600;
  }

  @font-face {
    font-family: 'RickRoll';
    src: url('./fonts/RickBlack.ttf');
    font-weight: 800;
  }

  body {
    margin: 0;
    padding: 0;

    font-family: 'RickRoll',-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
  }
`
