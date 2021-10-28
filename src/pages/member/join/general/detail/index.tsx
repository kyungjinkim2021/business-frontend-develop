import Template from '@Template';
import {
  checkIDupAsync,
  joinSlice,
  joinUserAsync,
  UserInfoType
} from '@Reducers/joinSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@Store/store';
import Router from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { VALID_MESSAGE } from '@Definitions/constants/term';
import DaumPostModal from '@Components/common/DaumPostModal';
import { Modal } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import {
  CheckIdDupType,
  JoinType
} from '@Controller/member/join/Join.Controller';

const pageStep = 3;

interface PassReturnType {
  valid?: boolean;
  errorCode?: string;
}

function Detail() {
  const dispatch = useDispatch();
  const { userInfo, joinStep } = useSelector(
    (state: RootState) => state.joinStore
  );

  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [isRePasswordValid, setIsRePasswordValid] = useState<boolean | null>(
    null
  );
  const [isDetailValid, setIsDetailValid] = useState<boolean | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [rePasswordError, setRePasswordError] = useState<string | null>(null);
  const [addressModalVisible, setAddressModalVisible] =
    useState<boolean>(false);
  const [userIdError, setUserIdError] = useState<string | null>(null);

  useEffect(() => {
    if (userInfo) {
      const { userId, zipcode, address, addressDetail } = userInfo;
      if (
        userId &&
        zipcode &&
        address &&
        addressDetail &&
        isPasswordValid &&
        isRePasswordValid
      ) {
        setIsDetailValid(true);
      } else {
        setIsDetailValid(false);
      }
    }
  }, [userInfo, isPasswordValid, isRePasswordValid]);

  useEffect(() => {
    if (joinStep < pageStep) {
      Router.replace('/member/join/general').then();
    }
  }, [joinStep]);
  const idInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (idInputRef.current) {
      idInputRef.current.focus();
    }
  }, [idInputRef]);

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

  useEffect(() => {
    if (userInfo?.userPass) {
      handlePassValid();
      handleReIsPasswordValid();
    }
  }, [userInfo?.userPass]);

  useEffect(() => {
    if (userInfo?.userPass) {
      handleReIsPasswordValid();
    }
  }, [userInfo?.userPassRe]);

  useEffect(() => {
    if (!isRePasswordValid && isRePasswordValid !== null) {
      setRePasswordError(VALID_MESSAGE.rePasswordNotMatch);
    } else {
      setRePasswordError(null);
    }
  }, [isRePasswordValid]);

  const handlePassValid = () => {
    const ENG_NUM_SPECIAL_PATTERN = /((?=.*\d)(?=.*[a-zA-Z])(?=.*[\W]).{8,})/;
    const ENG_NUM_PATTERN = /((?=.*\d)(?=.*[a-zA-Z]).{8,})/;
    const ENG_SPECIAL_PATTERN = /((?=.*[a-zA-Z])(?=.*[\W]).{8,})/;
    const SPECIAL_NUM_PATTERN = /((?=.*\d)(?=.*[\W]).{8,})/;
    const SAME_PATTERN = /(\w)\1\1\1/;
    const BLANK_PATTERN = /(\s)/;

    let validComplex = false;
    let validExtra = true;
    let errorCode = VALID_MESSAGE.ValidError;

    const checkValid = () => {
      const returnValue: PassReturnType = {};

      if (userInfo?.userPass) {
        const { userPass } = userInfo;

        if (ENG_NUM_SPECIAL_PATTERN.test(userPass)) {
          validComplex = true;
        }
        if (ENG_NUM_PATTERN.test(userPass)) {
          validComplex = true;
        }
        if (ENG_SPECIAL_PATTERN.test(userPass)) {
          validComplex = true;
        }
        if (SPECIAL_NUM_PATTERN.test(userPass)) {
          validComplex = true;
        }
        if (validComplex) {
          if (SAME_PATTERN.test(userPass)) {
            validExtra = false;
            errorCode = VALID_MESSAGE.SameWordError;
          }
          if (BLANK_PATTERN.test(userPass)) {
            validExtra = false;
            errorCode = VALID_MESSAGE.BlankError;
          }
          validComplex = validExtra;
        }
      }

      returnValue.valid = validComplex;
      returnValue.errorCode = errorCode;

      return returnValue;
    };

    if (userInfo?.userPass) {
      if (userInfo?.userPass.length > 0) {
        const checkResult: any = checkValid();
        setIsPasswordValid(checkResult.valid);
        if (!checkResult.valid) {
          setPasswordError(checkResult.errorCode);
        } else {
          setPasswordError(null);
        }
      }
    }
  };

  const handleReIsPasswordValid = () => {
    setIsRePasswordValid(userInfo?.userPass === userInfo?.userPassRe);
  };

  /**
   * 저장 이벤트 핸들러
   */
  const onClickHandler = async () => {
    Modal.confirm({
      title: '회원가입',
      content: (
        <>
          <span style={{ display: 'inline-block' }}>
            기입하신 정보가 맞는지 확인해주시기 바랍니다.
          </span>
          <span style={{ display: 'inline-block', marginTop: 20 }}>
            일반회원 가입을 진행하시겠습니까?
          </span>
        </>
      ),
      okText: '예',
      cancelText: '아니요',
      icon: (
        <>
          <InfoCircleOutlined />
        </>
      ),
      onOk: () => {
        const {} = userInfo as UserInfoType;
        const joinParam: Partial<JoinType> = {};
        dispatch(joinUserAsync(joinParam as JoinType));
      }
    });
  };

  const addressClickHandler = () => {
    setAddressModalVisible(true);
  };

  const idDuplicateCheckHandler = () => {
    if (userInfo?.userId) {
      const inputParam: CheckIdDupType = {
        userId: userInfo?.userId || '',
        available: false
      };
      dispatch(checkIDupAsync(inputParam));
    }
  };
  return (
    <Template title="탄소 상쇄 플랫폼">
      <JoinWrapper>
        <GeneralTitle>회원가입</GeneralTitle>
        <GeneralContents>
          <TitleWrapperFirst>일반회원</TitleWrapperFirst>
          <div className="sdtit01">아이디</div>
          <div className="lt_inp01">
            <div className="flex w-full">
              <div className="w1 w-full">
                <input
                  ref={idInputRef}
                  type="text"
                  placeholder="아이디를 입력하세요"
                  className="inp01"
                  value={userInfo?.userId || ''}
                  onChange={(event) => {
                    updateUserInfo({ userId: event.target.value });
                  }}
                  onBlur={() => {
                    if ((userInfo?.userId || '').trim().length < 4) {
                      setUserIdError('아이디를 입력해주세요.');
                    } else {
                      setUserIdError(null);
                    }
                  }}
                />
              </div>
              <div
                className="lt_btn01 duf_check"
                onClick={() => {
                  idDuplicateCheckHandler();
                }}
              >
                중복검사
              </div>
            </div>

            {userIdError && <p className="error01">{userIdError}</p>}
          </div>
          <div className="sdtit01 mt32 passwordArea">
            <span>비밀번호</span>
            <span className="description">
              (영어,숫자,특수문자 포함 8자 이상)
            </span>
          </div>
          <div className="lt_inp01">
            <div className="w1">
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="inp01"
                maxLength={20}
                value={userInfo?.userPass || ''}
                onChange={(event) => {
                  updateUserInfo({ userPass: event.target.value });
                }}
                onBlur={() => {
                  if ((userInfo?.userPass || '').trim().length < 8) {
                    setPasswordError('비밀번호를 입력하세요.');
                  } else {
                    setPasswordError(null);
                  }
                }}
              />
            </div>
            {passwordError && <p className="error01">{passwordError}</p>}
          </div>
          <div className="sdtit01 mt32">비밀번호 확인</div>
          <div className="lt_inp01">
            <div className="w1">
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="inp01"
                maxLength={20}
                value={userInfo?.userPassRe || ''}
                onChange={(event) => {
                  updateUserInfo({ userPassRe: event.target.value });
                }}
                onBlur={handleReIsPasswordValid}
              />
            </div>
            {rePasswordError && <p className="error01">{rePasswordError}</p>}
          </div>
          <div className="sdtit01 mt32">이름</div>
          <div className="lt_inp01">
            <div className="w1">
              <input
                type="text"
                placeholder="이름을 입력하세요"
                className="inp01 readonly"
                value={userInfo?.userName || ''}
              />
            </div>
          </div>
          <div className="sdtit01 mt32">휴대전화</div>
          <div className="lt_inp02">
            <div className="w2">
              <input
                type="text"
                placeholder="010"
                className="inp01 readonly"
                readOnly
                value={userInfo?.userPhone1 || ''}
              />
            </div>
            <div className="w2">
              <input
                type="text"
                placeholder=""
                className="inp01 readonly"
                readOnly
                value={userInfo?.userPhone2 || ''}
              />
            </div>
            <div className="w2">
              <input
                type="text"
                placeholder=""
                className="inp01 readonly"
                readOnly
                value={userInfo?.userPhone3 || ''}
              />
            </div>
          </div>
          <div className="sdtit01 mt32">성별</div>
          <div className="lt_chk01">
            <a className="readonly">
              <span>{`${userInfo?.sex === 'male' ? '남' : '여'}`}</span>
            </a>
          </div>
          <div className="sdtit01 mt32">생년월일</div>
          <div className="lt_inp01">
            <div className="w1">
              <input
                type="text"
                placeholder="예) 201212"
                className="inp01 readonly"
                readOnly
                value={userInfo?.birthYearMonth || ''}
              />
            </div>
          </div>
          <div className="sdtit01 mt32">주소</div>
          <div className="lt_inp03">
            <div className="w1">
              <input
                type="text"
                placeholder="주소"
                className="inp01"
                readOnly
                value={
                  (userInfo?.zipcode || '') !== '' &&
                  (userInfo?.address || '') !== ''
                    ? userInfo?.address || ''
                    : ''
                }
              />
            </div>
            <a
              className="lt_btn01"
              onClick={() => {
                addressClickHandler();
              }}
            >
              우편번호
            </a>
          </div>
          <div className="lt_inp01 mt08">
            <div className="w1">
              <input
                type="text"
                placeholder="상세주소"
                className="inp01"
                value={userInfo?.addressDetail || ''}
                onChange={(event) => {
                  updateUserInfo({ addressDetail: event.target.value });
                }}
              />
            </div>
          </div>

          <ButtonWrapper
            disabled={!isDetailValid}
            onClick={() => {
              if (isDetailValid) {
                onClickHandler();
              }
            }}
          >
            <span>회원가입</span>
          </ButtonWrapper>
        </GeneralContents>
        <DaumPostModal
          visible={addressModalVisible}
          onComplete={(data: any) => {
            console.log('onComplete data >>', data);
            let fullAddress = data.address;
            let extraAddress = '';

            if (data.addressType === 'R') {
              if (data.bname !== '') {
                extraAddress += data.bname;
              }
              if (data.buildingName !== '') {
                extraAddress +=
                  extraAddress !== ''
                    ? `, ${data.buildingName}`
                    : data.buildingName;
              }
              fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
            }
            updateUserInfo({ zipcode: data.zonecode, address: fullAddress });
            setAddressModalVisible(false);
          }}
          onToggle={() => {
            setAddressModalVisible(false);
            console.log('onToggle');
          }}
        />
      </JoinWrapper>
    </Template>
  );
}

export default Detail;

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
  .lt_btn01 {
    font-size: 15px;
    background: #ffffff;
    display: block;
    line-height: 44px;
    text-align: center;
    border: 1px solid #191f28;
    cursor: pointer;
  }
  .flex {
    display: flex;
  }
  .w-full {
    width: 100%;
  }
  .duf_check {
    width: 100px;
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
  .lt_chk01 .readonly {
    background: #f9fafb;
    cursor: default;
  }
  .lt_chk01 a.readonly span {
    color: #191f28;
    background: url(/static/images/ico_chk02.png) left -24px no-repeat;
    background-size: 14px auto;
  }
  .inp01.readonly {
    background: #f9fafb;
  }
  .lt_inp03 {
    display: flex;
  }
  .lt_inp03 .w1 {
    width: 100%;
  }
  .mt08 {
    margin-top: 8px;
  }
  .lt_btn01 {
    width: 137px;
    margin-left: 8px;
    font-size: 15px;
    background: #ffffff;
    display: block;
    line-height: 44px;
    text-align: center;
    border: 1px solid #191f28;
  }
  .passwordArea {
    display: flex;
    justify-content: space-between;
    .description {
      margin-left: 4px;
      font-size: 12px;
    }
  }
`;
