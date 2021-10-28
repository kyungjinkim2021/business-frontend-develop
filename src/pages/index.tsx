import styled, { DefaultTheme } from 'styled-components';
import { Text } from '@Components/Text';
import { useDispatch } from 'react-redux';
import { userSlice } from '@Reducers/userSlice';
import React from 'react';
import Template from '@Template';

export default function IndexPage() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(
        userSlice.actions.setUser({
          id: 2,
          username: 'Kevin'
        })
      );
    }, 2000);
  });

  return (
    <Template title="탄소 상쇄 플랫폼">
      <Container>
        <StyledText style={{ margin: '10px 0' }}>탄소 이야기</StyledText>
      </Container>
    </Template>
  );
}

const Container = styled.div<{
  theme: DefaultTheme;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const StyledText = styled(Text).attrs({
  fontSize: 25,
  regular: true
})``;
