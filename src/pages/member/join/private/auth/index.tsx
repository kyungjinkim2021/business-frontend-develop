import Template from '@Template';
import { joinSlice } from '@Reducers/joinSlice';
import styled, { DefaultTheme } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@Store/store';
import Router from 'next/router';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

const pageStep = 2;
function Auth() {
  const dispatch = useDispatch();
  const { userInfo, joinStep } = useSelector(
    (state: RootState) => state.joinStore
  );

  const [err1Message, setErr1Message] = useState<string | null>(null);
  const [err2Message, setErr2Message] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (joinStep < pageStep) {
      Router.replace('/member/join/general').then();
    }
  }, [joinStep]);

  const onClickHandler = async () => {
    await dispatch(joinSlice.actions.updateJoinStep(3));
    Router.replace('/member/join/private/detail').then();
  };

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [nameInputRef]);

  const updateUserInfo = useCallback(
    (userInfoItem) => {
      dispatch(
        joinSlice.actions.updateUserInfo({
          userInfo: userInfoItem
        })
      );
    },
    [dispatch]
  );
  const handlePress = (e: ChangeEvent<HTMLInputElement>, inputType: string) => {
    const regex = /^[0-9\b -]{0,13}$/;
    const numRegex = /[^0-9]/g;
    const inputValue = e.target.value;
    const isValid = regex.test(inputValue);
    let updateValue = inputValue;
    if (!isValid) {
      updateValue = inputValue.replace(numRegex, '');
    }
    if (inputType === 'birthYearMonth') {
      updateUserInfo({ birthYearMonth: updateValue });
    } else if (inputType === 'userPhone1') {
      updateUserInfo({ userPhone1: updateValue });
    } else if (inputType === 'userPhone2') {
      updateUserInfo({ userPhone2: updateValue });
    } else if (inputType === 'userPhone3') {
      updateUserInfo({ userPhone3: updateValue });
    }
  };

  useEffect(() => {
    if (userInfo?.userPhone1 && userInfo?.userPhone2 && userInfo?.userPhone3) {
      const { userPhone1, userPhone2, userPhone3 } = userInfo;
      const regPhone = /^01([016789])-?([0-9]{3,4})-?([0-9]{4})$/;
      const phoneData = `${userPhone1}-${userPhone2}-${userPhone3}`;
      if (regPhone.test(phoneData)) {
        updateUserInfo({ userPhoneIsValid: true });
      } else {
        updateUserInfo({ userPhoneIsValid: false });
      }
    }
  }, [userInfo?.userPhone1, userInfo?.userPhone2, userInfo?.userPhone3]);

  useEffect(() => {
    if (userInfo?.birthYearMonth) {
      const birthRegx = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/;
      if (birthRegx.test(userInfo?.birthYearMonth)) {
        setErr2Message(null);
      } else {
        setErr2Message('생년월일을 입력해주세요.');
      }
    }
  }, [userInfo?.birthYearMonth]);

  const userPhoneAuthCodeHandler = () => {};

  return (
    <Template title="탄소 상쇄 플랫폼">
      <JoinWrapper>
        <GeneralTitle>회원가입</GeneralTitle>
        <GeneralContents>
          <TitleWrapperFirst>본인인증 하기</TitleWrapperFirst>
          <div className="sdtit01">이름</div>
          <div className="lt_inp01">
            <div className="w1">
              <input
                ref={nameInputRef}
                type="text"
                placeholder="이름을 입력하세요"
                className="inp01"
                value={userInfo?.userName || ''}
                onChange={(event) => {
                  updateUserInfo({ userName: event.target.value });
                }}
                onBlur={() => {
                  if ((userInfo?.userName || '').trim().length < 2) {
                    setErr1Message('이름을 입력해주세요.');
                  } else {
                    setErr1Message(null);
                  }
                }}
              />
            </div>
            {err1Message && <p className="error01">{err1Message}</p>}
          </div>
          <div className="sdtit01 mt32">생년월일</div>
          <div className="lt_inp01">
            <div className="w1">
              <input
                type="text"
                placeholder="예) 201212"
                className="inp01"
                maxLength={8}
                value={userInfo?.birthYearMonth || ''}
                onChange={(event) => {
                  handlePress(event, 'birthYearMonth');
                }}
                onBlur={() => {
                  if ((userInfo?.birthYearMonth || '').trim().length < 8) {
                    setErr2Message('생년월일을 입력해주세요.');
                  } else {
                    setErr2Message(null);
                  }
                }}
              />
            </div>
            {err2Message && <p className="error01">{err2Message}</p>}
          </div>
          <div className="sdtit01 mt32">성별</div>
          <div className="lt_chk01">
            <a
              className={`${userInfo?.sex === 'male' ? 'on' : ''}`}
              onClick={() => {
                updateUserInfo({ sex: 'male' });
              }}
            >
              <span>남</span>
            </a>
            <a
              className={`${userInfo?.sex === 'female' ? 'on' : ''}`}
              onClick={() => {
                updateUserInfo({ sex: 'female' });
              }}
            >
              <span>여</span>
            </a>
          </div>
          <div className="sdtit01 mt32">휴대전화</div>
          <div className="lt_inp02">
            <div className="w2">
              <input
                type="text"
                placeholder="010"
                className="inp01"
                maxLength={3}
                value={userInfo?.userPhone1 || ''}
                onChange={(event) => {
                  handlePress(event, 'userPhone1');
                }}
              />
            </div>
            <div className="w2">
              <input
                type="text"
                placeholder=""
                className="inp01"
                maxLength={4}
                value={userInfo?.userPhone2 || ''}
                onChange={(event) => {
                  handlePress(event, 'userPhone2');
                }}
              />
            </div>
            <div className="w2">
              <input
                type="text"
                placeholder=""
                className="inp01"
                maxLength={4}
                value={userInfo?.userPhone3 || ''}
                onChange={(event) => {
                  handlePress(event, 'userPhone3');
                }}
              />
            </div>
            <div className="w2">
              <AuthButtonWrapper
                disabled={
                  !userInfo?.userPhoneIsValid ||
                  err1Message !== null ||
                  err2Message !== null
                }
                onClick={() => {
                  if (
                    userInfo?.userPhoneIsValid &&
                    err1Message === null &&
                    err2Message === null
                  ) {
                    userPhoneAuthCodeHandler();
                  }
                }}
              >
                인증번호
              </AuthButtonWrapper>
            </div>
          </div>
          <div className="sdtit01 mt32">인증번호</div>
          <div className="lt_inp01">
            <div className="w1">
              <input
                type="text"
                placeholder="인증번호를 입력하세요"
                className="inp01"
                disabled={!userInfo?.userPhoneIsValid}
                onChange={() => {
                  updateUserInfo({ authCodeIsChecked: true });
                }}
              />
            </div>
          </div>

          <ButtonWrapper
            disabled={!userInfo?.authCodeIsChecked}
            onClick={() => {
              onClickHandler();
            }}
          >
            <span>확인</span>
          </ButtonWrapper>
        </GeneralContents>
      </JoinWrapper>
    </Template>
  );
}

export default Auth;

const AuthButtonWrapper = styled.a<{ disabled: boolean }>`
  font-size: 15px;
  display: block;
  line-height: 44px;
  user-select: none;
  text-align: center;
  border: 1px solid #191f28;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background: ${({ disabled }) => (disabled ? '#ffffff' : '#ffffff')};
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

const TitleWrapperFirst = styled.span`
  padding-bottom: 16px;
  font-size: 18px;
  line-height: 26px;
  font-weight: 700;
  display: block;
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

const JoinWrapper = styled.div<{
  theme: DefaultTheme;
}>`
  width: 100%;
  margin-top: 60px;

  .sdtit01 {
    color: #4e5968;
    font-size: 15px;
    line-height: 22px;
    padding-bottom: 10px;
  }
  .inp01 {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid #e5e8eb;
    outline: none;
    line-height: 22px;
    padding: 11px 16px;
    font-size: 15px;
    line-height: 22px;
  }
  .error01 {
    font-size: 15px;
    line-height: 22px;
    color: #e70c0c;
    margin-top: 10px;
  }

  .mt32 {
    margin-top: 32px !important;
  }

  .lt_chk01 a.on {
    border: 1px solid #191f28;
    color: #191f28;
  }
  .lt_chk01 a {
    padding: 0 16px;
    display: inline-block;
    border: 1px solid #e5e8eb;
    border: 1px solid #e5e8eb;
  }
  .lt_chk01 a.on span {
    color: #191f28;
    background: url(/static/images/ico_chk02.png) left -24px no-repeat;
    background-size: 14px auto;
  }
  .lt_chk01 a span {
    color: #8b95a1;
    display: block;
    font-size: 15px;
    line-height: 44px;
    padding-left: 22px;
    background: url(/static/images/ico_chk02.png) left 15px no-repeat;
    background-size: 14px auto;
  }
  .lt_inp02 {
    margin: 0 -4px;
    display: inline-block;
  }
  .lt_inp02 .w2 {
    float: left;
    width: 25%;
    padding: 0 4px;
    box-sizing: border-box;
  }
  .lt_btn01 {
    font-size: 15px;
    background: #ffffff;
    display: block;
    line-height: 44px;
    text-align: center;
    border: 1px solid #191f28;
  }
`;
