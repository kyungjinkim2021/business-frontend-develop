import { DefaultTheme, createGlobalStyle, css } from 'styled-components';
import { normalize } from 'styled-normalize';

const lightTheme: DefaultTheme = {
  body: '#FFF',
  text: '#000000',
  lightText: '#6b7684',
  toggleBorder: '#FFF',
  background: '#f9fafb'
};

const darkTheme: DefaultTheme = {
  body: '#363537',
  text: '#FFFFFF',
  lightText: '#e2e2e2',
  toggleBorder: '#6B8096',
  background: '#999'
};
const theme = {
  lightTheme,
  darkTheme
};

const breakPoint = {
  mobile: `(max-width: 414px)`,
  tablet: `(max-width: 1080px)`,
  desktop: `(max-width: 1440px)`
};

const GlobalStyles = createGlobalStyle`
  ${normalize}
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: "NotoSansKR", "맑은 고딕","Malgun Gothic", "나눔고딕", "Nanum Gothic", "NotoSansKR","굴림", Gulim,'돋움',dotum,Helvetica,sans-serif;;
    transition: all 0.50s linear;
  }
  font-weight: 400;
  letter-spacing: -0.5px;
  ul {
    padding-inline-start: 0px;
  }
`;

const center = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const centerBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export { theme, GlobalStyles, breakPoint, centerBetween, center };
