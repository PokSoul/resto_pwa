import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

  body {
    margin-top: 10%;
    background: ${({ theme }) => theme.primaryDark};
    color: ${({ theme }) => theme.primaryLight};
    overscroll-behavior: none; 
    text-rendering: optimizeLegibility;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }


`

export default GlobalStyles
