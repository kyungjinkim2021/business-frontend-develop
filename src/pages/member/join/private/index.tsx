import Template from '@Template';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@Store/store';
import React, { useEffect } from 'react';
import Router from 'next/router';
import { joinSlice } from '@Reducers/joinSlice';
import _ from 'lodash';
import styled, { DefaultTheme } from 'styled-components';

const pageStep = 1;

function Private() {
  const dispatch = useDispatch();
  const { joinStep, joinAgent } = useSelector(
    (state: RootState) => state.joinStore
  );

  useEffect(() => {
    if (joinStep < pageStep) {
      Router.replace('/member/join').then(() => {});
    }
  }, [joinStep]);

  const onConfirmHandler = async () => {
    await dispatch(joinSlice.actions.updateJoinStep(2));
    Router.replace('/member/join/private/auth').then(() => {
      dispatch(joinSlice.actions.resetUserInfo());
    });
  };

  const updateJoinAgent = (isAgent: boolean) => {
    dispatch(joinSlice.actions.updateJoinAgent(isAgent));
  };

  return (
    <Template title="탄소 상쇄 플랫폼">
      <JoinWrapper>
        <GeneralTitle>회원가입</GeneralTitle>
        <GeneralContents>
          <div className="m2d_con">
            <ul>
              <li>
                <a
                  className={joinAgent ? '' : 'on'}
                  onClick={() => {
                    updateJoinAgent(false);
                  }}
                >
                  대표 가입
                </a>
              </li>
              <li>
                <a
                  className={joinAgent ? 'on' : ''}
                  onClick={() => {
                    updateJoinAgent(true);
                  }}
                >
                  대리인 가입
                </a>
              </li>
            </ul>
          </div>
          <ButtonWrapper
            disabled={false}
            onClick={() => {
              onConfirmHandler().then();
            }}
          >
            <span>다음</span>
          </ButtonWrapper>
        </GeneralContents>
      </JoinWrapper>
    </Template>
  );
}

export default Private;

const JoinWrapper = styled.div<{
  theme: DefaultTheme;
}>`
  width: 100%;
  margin-top: 60px;
`;

const ButtonWrapper = styled.div<{ disabled: boolean }>`
  margin-top: 32px;
  span {
    display: block;
    user-select: none;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    text-align: center;
    background: ${({ disabled }) => (disabled ? '#b1b1b1' : '#191f28')};
    font-size: 15px;
    line-height: 46px;
    color: #ffffff;
    font-weight: 700;
  }
`;
const GeneralContents = styled.div`
  margin: 0 auto;
  padding: 76px;
  width: 586px;
  background: #ffffff;
  border: 1px solid #e5e8eb;
  .lterm01_chk01 {
    margin-top: 16px;
  }
  .lterm01_chk01 input {
    width: 22px;
    height: 22px;
    border: 1px solid #c4c4c4;
    vertical-align: middle;
  }
  .lterm01_chk01 label {
    font-size: 13px;
    line-height: 24px;
    padding-left: 3px;
    margin-left: 5px;
  }
  ul {
    list-style: none;
  }
  .m2d_con {
    height: 46px;
  }
  .m2d_con ul li {
    background: #f2f4f6;
    width: 50%;
    float: left;
    padding: 4px;
    box-sizing: border-box;
  }
  .m2d_con ul li a.on {
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
    background: #ffffff;
    color: #191f28;
    font-weight: 500;
  }
  .m2d_con ul li a {
    color: #8b95a1;
    font-size: 15px;
    line-height: 38px;
    display: block;
    text-align: center;
  }
  a {
    text-decoration: none;
    color: #000000;
  }
`;

const GeneralTitle = styled.span`
  width: 100%;
  margin-bottom: 60px;
  font-weight: 700;
  line-height: 36px;
  font-size: 24px;
  text-align: center;
  display: inline-block;
`;
