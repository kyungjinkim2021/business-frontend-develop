import * as React from 'react';
import styled, { DefaultTheme } from 'styled-components';

export default function Footer() {
  return (
    <FooterContainer>
      <Contents>
        <p>
          Copyright © <ContentsBold>Forest</ContentsBold> Corp. All rights
          reserved.
        </p>
      </Contents>
    </FooterContainer>
  );
}

const FooterContainer = styled.div<{
  theme: DefaultTheme;
}>`
  padding: 25px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: -1;
  background-color: ${({ theme }) => theme.background};
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 15px;
  line-height: 18px;
  color: #6b7684;
`;

const ContentsBold = styled.span`
  font-weight: bold;
`;
