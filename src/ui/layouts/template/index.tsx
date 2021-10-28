import React, { ReactNode } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styled, { DefaultTheme } from 'styled-components';
import Header from '../parts/Header';

const Footer = dynamic(() => import('../parts/Footer'), {
  ssr: false
});

interface ITemplateProps {
  children?: ReactNode;
  title?: string;
}

export default function Template({
  children,
  title = '탄소 상쇄 프로젝트'
}: ITemplateProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=fallback"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <LayoutContainer>
        <Header />
        <Body>{children}</Body>
        <Footer />
      </LayoutContainer>
    </>
  );
}

const Body = styled.div<{
  theme: DefaultTheme;
}>`
  background-color: ${({ theme }) => theme.background};
  min-height: calc(100vh - 176px);
  section {
    height: 100vh;
  }
`;

const LayoutContainer = styled.div<{
  theme: DefaultTheme;
}>`
  min-width: 900px;
  background-color: ${({ theme }) => theme.background};
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
