import { createGlobalStyle } from 'styled-components';
import { normalizeStyles } from './normalize';

export const GlobalStyles = createGlobalStyle`
  /* Normalize */
  ${normalizeStyles}

  :root {
    /* Colors */
    --color-black: #000000;
    --color-white: #FFFFFF;
    --color-background: #FED7BF;
    --color-white-translucent: rgba(255, 255, 255, 0.3);

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
    background-color: var(--color-background);
  }

  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
`;
