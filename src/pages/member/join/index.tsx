import styled, { DefaultTheme } from 'styled-components';

import Template from '@Template';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { joinSlice, testJoinData } from '@Reducers/joinSlice';
import { useEffect } from 'react';
import { RootState } from '@Store/store';

function Join() {
  const dispatch = useDispatch();
  const { joinType } = useSelector((state: RootState) => state.joinStore);

  const LoginTypeHandler = async (loginType: string) => {
    await dispatch(joinSlice.actions.updateJoinType(loginType));
    await dispatch(joinSlice.actions.updateJoinStep(1));
    await dispatch(joinSlice.actions.resetTermAgree());
    if (loginType === 'general') {
      Router.push('/member/join/general').then();
    } else if (loginType === 'private') {
      Router.push('/member/join/private').then();
    } else if (loginType === 'corporate') {
      Router.push('/member/join/corporate').then();
    }
  };

  const demoAction = async () => {
    await dispatch(joinSlice.actions.clear({ initData: testJoinData }));
    Router.push(`/member/join/general/detail`).then();
  };

  useEffect(() => {
    if (!joinType) {
      demoAction();
    }
  }, [joinType]);

  return (
    <Template title="탄소 상쇄 플랫폼">
      <JoinWrapper>
        <LoginTitle>회원가입</LoginTitle>
        <LoginButtonWrapper>
          <ButtonContainer>
            <ul>
              <li>
                <span
                  onClick={() => {
                    LoginTypeHandler('general');
                  }}
                >
                  일반 회원
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    LoginTypeHandler('private');
                  }}
                >
                  개인 사업자 회원
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    LoginTypeHandler('corporate');
                  }}
                >
                  법인 사업자 회원
                </span>
              </li>
            </ul>
          </ButtonContainer>
        </LoginButtonWrapper>
      </JoinWrapper>
    </Template>
  );
}

export default Join;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginButtonWrapper = styled.div`
  margin-top: 60px;
  ul {
    list-style: none;
  }
  ul li {
    display: block;
    float: left;
    width: 180px;
    height: 200px;
    padding: 0 12px;
    margin: 0 10px;
  }
  ul li span {
    width: 176px;
    border-radius: 20px;
    border: solid 2px #b0b8c1;
    background-color: #fff;
    position: relative;
    font-size: 18px;
    line-height: 26px;
    display: block;
    text-align: center;
    padding: 77px 0 93px 0;
    cursor: pointer;
  }
  ul li span:after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    left: 50%;
    margin-left: -9px;
    top: 111px;
    display: block;
    background: url(/static/images/ico_chk01.png) 0 0 no-repeat;
    background-size: 18px;
  }
  ul li span:hover {
    font-weight: 700;
    border: solid 2px #191f28;
    box-shadow: 0 4px 4px 0 rgb(0 0 0 / 10%);
  }
  ul li span:hover:after {
    background: url(/static/images/ico_chk01.png) 0 -50px no-repeat;
    background-size: 18px;
  }
`;

const LoginTitle = styled.span`
  width: 100%;
  font-weight: 700;
  line-height: 36px;
  font-size: 24px;
  text-align: center;
  display: inline-block;
`;

const JoinWrapper = styled.div<{
  theme: DefaultTheme;
}>`
  width: 100%;
  margin-top: 60px;
`;
