import { createGlobalStyle } from 'styled-components';
import { normalizeStyles } from './normalize';

export const GlobalStyles = createGlobalStyle`
  /* Normalize */
  ${normalizeStyles}

  :root {
    /* Light mode colors */
    --color-text: #000000D9;
    --color-body: #FED7BF;
    --color-card: #FFFFFF4D;

    /* Dark mode colors */
    @media (prefers-color-scheme: dark) {
      --color-text: #FFFFFFD9;
      --color-body: #05010d;
      --color-card: linear-gradient(0deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,.1));
    }

    /* Fonts */
    --font-family-primary: "Inter", Helvetica, Arial, sans-serif;

    /* Sizes */
    --container-width: 480px;
    --container-gutter: 20px;
    --card-radius: 12px;
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

  /* inter-regular - latin */
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: local(''),
      url('/fonts/inter-v12-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
      url('/fonts/inter-v12-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
  /* inter-500 - latin */
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    src: local(''),
      url('/fonts/inter-v12-latin-500.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
      url('/fonts/inter-v12-latin-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
  /* inter-700 - latin */
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    src: local(''),
      url('/fonts/inter-v12-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
      url('/fonts/inter-v12-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
`;
