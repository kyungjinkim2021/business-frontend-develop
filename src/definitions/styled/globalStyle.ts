import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body{
    min-height: 100%;
    height: auto;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: inherit;
    font-weight: inherit;
    margin: 0;
  }

  display {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: inherit;
    font-weight: inherit;
  }
  
  button{ 
    outline: none;
    border:none;
  }

  a{ 
    text-decoration:none;
  }

`;
