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

  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
`;
