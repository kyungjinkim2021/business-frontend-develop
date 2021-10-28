import React from 'react';
import styled, { DefaultTheme } from 'styled-components';

import { center } from '@Styled';
import Header from '../../../layouts/parts/Header';

interface LoadingProps {
  loading?: boolean;
}
function Loading({}: LoadingProps) {
  return (
    <LoadingWrapper>
      <LayoutContainer>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <Body>
          <div className="spinner" />
        </Body>
      </LayoutContainer>
    </LoadingWrapper>
  );
}

export default Loading;

const LoadingWrapper = styled.div<{
  theme: DefaultTheme;
}>`
  ${center};
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.background};
  .spinner {
    width: 45px;
    height: 45px;
    background-color: #333;
    margin: 100px auto;
    animation: rotateplane 1.2s infinite ease-in-out;

    @keyframes rotateplane {
      0% {
        transform: perspective(120px) rotateX(0deg) rotateY(0deg);
        -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      }
      50% {
        transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
        -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
      }
      100% {
        transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
        -webkit-transform: perspective(120px) rotateX(-180deg)
          rotateY(-179.9deg);
      }
    }
  }
`;

const Body = styled.div<{
  theme: DefaultTheme;
}>`
  background-color: ${({ theme }) => theme.background};
  section {
    height: 100vh;
  }
`;

const HeaderWrapper = styled.div`
  div.topWrapper {
    position: absolute;
    top: 0;
  }
`;

const LayoutContainer = styled.div<{
  theme: DefaultTheme;
}>`
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  overflow: auto;
  .ant-layout-header {
    padding: initial;
    height: initial;
  }
  ol,
  ul,
  dl {
    margin: initial;
  }
  a {
    color: ${({ theme }) => theme.text};
    text-decoration: none;
  }
`;
