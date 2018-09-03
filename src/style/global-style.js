/* eslint-disable */
import { injectGlobal } from 'styled-components';

injectGlobal`
  html, body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;

    font-family: 'Ubuntu', 'Nanum Gothic', sans-serif;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  h1, h2, h3, input {
    font-family: 'Righteous', 'Gothic A1', cursive;
  }

  pre {
    background-color: #2D2D2D;
    padding: 5px 10px;
  }
`;
