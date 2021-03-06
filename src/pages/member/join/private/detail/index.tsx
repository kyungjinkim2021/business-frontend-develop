import Template from '@Template';
import { joinSlice, joinUserAsync, UserInfoType } from '@Reducers/joinSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@Store/store';
import Router from 'next/router';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { VALID_MESSAGE } from '@Definitions/constants/term';
import DaumPostModal from '@Components/common/DaumPostModal';
import { Modal } from 'antd';
import { InfoCircleOutlined, MinusOutlined } from '@ant-design/icons';
import { JoinType } from '@Controller/member/join/Join.Controller';

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
  const [isBusinessNumberValid, setIsBusinessNumberValid] = useState<
    boolean | null
  >(null);
  const [businessNumberError, setBusinessNumberError] = useState<string | null>(
    null
  );
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
        isRePasswordValid &&
        isBusinessNumberValid
      ) {
        setIsDetailValid(true);
      } else {
        setIsDetailValid(false);
      }
    }
  }, [userInfo, isPasswordValid, isRePasswordValid, isBusinessNumberValid]);

  useEffect(() => {
    if (joinStep < pageStep) {
      Router.replace('/member/join/private').then();
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

  const checkBusinessNumber = (checkNumber: string) => {
    const numberMap = checkNumber
      .replace(/-/gi, '')
      .split('')
      .map(function (d) {
        return parseInt(d, 10);
      });

    if (numberMap.length == 10) {
      const keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5];
      let chk = 0;

      keyArr.forEach(function (d, i) {
        chk += d * numberMap[i];
      });

      chk += parseInt(String((keyArr[8] * numberMap[8]) / 10), 10);
      console.log(chk);
      return Math.floor(numberMap[9]) === (10 - (chk % 10)) % 10;
    }
    return false;
  };
  const onChangeBusinessNumber = (targetValue: string) => {
    const isValid = checkBusinessNumber(targetValue);
    setIsBusinessNumberValid(isValid);
    if (!isValid) {
      setBusinessNumberError('??????????????? ??????????????? ??????????????????');
    } else {
      setBusinessNumberError(null);
    }
  };
  useEffect(() => {
    if (
      userInfo?.businessNumber1 &&
      userInfo?.businessNumber2 &&
      userInfo?.businessNumber3
    ) {
      const { businessNumber1, businessNumber2, businessNumber3 } =
        userInfo || {};
      onChangeBusinessNumber(
        `${businessNumber1}${businessNumber2}${businessNumber3}`
      );
    }
  }, [
    userInfo?.businessNumber1,
    userInfo?.businessNumber2,
    userInfo?.businessNumber3
  ]);

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
    } else if (inputType === 'businessNumber1') {
      updateUserInfo({ businessNumber1: updateValue });
    } else if (inputType === 'businessNumber2') {
      updateUserInfo({ businessNumber2: updateValue });
    } else if (inputType === 'businessNumber3') {
      updateUserInfo({ businessNumber3: updateValue });
    }
  };

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
   * ?????? ????????? ?????????
   */
  const onClickHandler = async () => {
    Modal.confirm({
      title: '????????????',
      content: (
        <>
          <span style={{ display: 'inline-block' }}>
            ???????????? ????????? ????????? ?????????????????? ????????????.
          </span>
          <span style={{ display: 'inline-block', marginTop: 20 }}>
            ???????????? ????????? ?????????????????????????
          </span>
        </>
      ),
      okText: '???',
      cancelText: '?????????',
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

  return (
    <Template title="?????? ?????? ?????????">
      <JoinWrapper>
        <GeneralTitle>????????????</GeneralTitle>
        <GeneralContents>
          <TitleWrapperFirst>??????????????? ??????</TitleWrapperFirst>
          <div className="sdtit01 mt32 passwordArea">
            <span>??????????????? ????????????</span>
          </div>
          <div className="lt_inp02 flex business">
            <div className="no">
              <div className="w2">
                <input
                  ref={idInputRef}
                  type="text"
                  placeholder=""
                  className="inp01"
                  maxLength={4}
                  value={userInfo?.businessNumber1 || ''}
                  onChange={(event) => {
                    handlePress(event, 'businessNumber1');
                  }}
                />
              </div>
              <span className="dash">
                <MinusOutlined style={{ fontSize: '10px' }} />
              </span>
              <div className="w2 small">
                <input
                  type="text"
                  placeholder=""
                  className="inp01"
                  maxLength={2}
                  value={userInfo?.businessNumber2 || ''}
                  onChange={(event) => {
                    handlePress(event, 'businessNumber2');
                  }}
                />
              </div>
              <span className="dash">
                <MinusOutlined style={{ fontSize: '10px' }} />
              </span>
              <div className="w2">
                <input
                  type="text"
                  placeholder=""
                  className="inp01"
                  maxLength={5}
                  value={userInfo?.businessNumber3 || ''}
                  onChange={(event) => {
                    handlePress(event, 'businessNumber3');
                  }}
                />
              </div>
            </div>

            {!isBusinessNumberValid && (
              <p className="error01">{businessNumberError}</p>
            )}
          </div>

          <div className="sdtit01 mt32">?????????</div>
          <div className="lt_inp01">
            <div className="w1">
              <input
                type="text"
                placeholder="???????????? ???????????????"
                className="inp01"
                value={userInfo?.userId || ''}
                onChange={(event) => {
                  updateUserInfo({ userId: event.target.value });
                }}
                onBlur={() => {
                  if ((userInfo?.userId || '').trim().length < 4) {
                    setUserIdError('???????????? ??????????????????.');
                  } else {
                    setUserIdError(null);
                  }
                }}
              />
            </div>
            {userIdError && <p className="error01">{userIdError}</p>}
          </div>
          <div className="sdtit01 mt32 passwordArea">
            <span>????????????</span>
            <span className="description">
              (??????,??????,???????????? ?????? 8??? ??????)
            </span>
          </div>
          <div className="lt_inp01">
            <div className="w1">
              <input
                type="password"
                placeholder="??????????????? ???????????????"
                className="inp01"
                maxLength={20}
                value={userInfo?.userPass || ''}
                onChange={(event) => {
                  updateUserInfo({ userPass: event.target.value });
                }}
                onBlur={() => {
                  if ((userInfo?.userPass || '').trim().length < 8) {
                    setPasswordError('??????????????? ???????????????.');
                  } else {
                    setPasswordError(null);
                  }
                }}
              />
            </div>
            {passwordError && <p className="error01">{passwordError}</p>}
          </div>
          <div className="sdtit01 mt32">???????????? ??????</div>
          <div className="lt_inp01">
            <div className="w1">
              <input
                type="password"
                placeholder="??????????????? ???????????????"
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
          <div className="sdtit01 mt32">??????</div>
          <div className="lt_inp01">
            <div className="w1">
              <input
                type="text"
                placeholder="????????? ???????????????"
                className="inp01 readonly"
                value={userInfo?.userName || ''}
              />
            </div>
          </div>
          <div className="sdtit01 mt32">????????????</div>
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
          <div className="sdtit01 mt32">??????</div>
          <div className="lt_chk01">
            <a className="readonly">
              <span>{`${userInfo?.sex === 'male' ? '???' : '???'}`}</span>
            </a>
          </div>
          <div className="sdtit01 mt32">????????????</div>
          <div className="lt_inp01">
            <div className="w1">
              <input
                type="text"
                placeholder="???) 201212"
                className="inp01 readonly"
                readOnly
                value={userInfo?.birthYearMonth || ''}
              />
            </div>
          </div>
          <div className="sdtit01 mt32">??????</div>
          <div className="lt_inp03">
            <div className="w1">
              <input
                type="text"
                placeholder="??????"
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
              ????????????
            </a>
          </div>
          <div className="lt_inp01 mt08">
            <div className="w1">
              <input
                type="text"
                placeholder="????????????"
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
            <span>????????????</span>
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
  .lt_inp02.flex {
    display: flex;
    flex-direction: column;
  }
  .lt_inp02.business .w2:first-child {
    width: 75px;
  }
  .lt_inp02.business .w2.small {
    width: 65px !important;
  }
  .lt_inp02.business .w2:last-child {
    width: 85px;
  }
  .lt_inp02.business .no {
    display: flex;
    align-items: center;
    .dash {
      padding: 0 2px;
    }
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
