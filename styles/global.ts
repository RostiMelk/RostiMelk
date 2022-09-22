import { createGlobalStyle } from 'styled-components';
import { normalizeStyles } from './normalize';

export const GlobalStyles = createGlobalStyle`
  /* Normalize */
  ${normalizeStyles}

  :root {
    /* Light mode colors */
    --color-text: #000000;
    --color-body: #FED7BF;
    --color-card: #FFFFFF4D;

    /* Dark mode colors */
    @media (prefers-color-scheme: dark) {
      --color-text: #FFFFFF;
      --color-body: #1A202C;
      --color-card: #2D3748;
    }

    /* Fonts */
    --font-family-primary: "Noto Sans", Helvetica, Arial, sans-serif;

    /* Sizies */
    --container-width: 480px;
    --container-gutter: 20px;
  }

  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    font-size: 18px;
    font-family: var(--font-family-primary);
    line-height: 1.3;
    background-color: var(--color-body);
  }

  /* noto-sans-regular - latin */
  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    src: local(''),
        url('/fonts/noto-sans-v27-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('/fonts/noto-sans-v27-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
  /* noto-sans-500 - latin */
  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    src: local(''),
        url('/fonts/noto-sans-v27-latin-500.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('/fonts/noto-sans-v27-latin-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
  /* noto-sans-700 - latin */
  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    src: local(''),
        url('/fonts/noto-sans-v27-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('/fonts/noto-sans-v27-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
`;
