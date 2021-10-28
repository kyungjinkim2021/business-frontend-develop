import styled, { DefaultTheme } from 'styled-components';
import { TermType } from '@Definitions/constants/term';
import { useEffect } from 'react';
import _ from 'lodash';

interface TermProps {
  termList: Array<TermType>;
  onConfirmHandler: () => void;
  isValidTerm: boolean;
  setIsValidTerm: (isValid: boolean) => void;
}

function Term({
  termList,
  onConfirmHandler,
  isValidTerm,
  setIsValidTerm
}: TermProps) {
  useEffect(() => {
    if (termList) {
      const isAllChecked =
        _.filter(termList, (item) => {
          return item.isChecked;
        }).length === termList.length;
      setIsValidTerm(isAllChecked);
    }
  }, [termList]);

  return (
    <JoinWrapper>
      <GeneralTitle>회원가입</GeneralTitle>
      <GeneralContents>
        {(termList || []).map((value, index) => {
          return (
            <span key={value.title}>
              {(value.title || '') !== '' ? (
                <>
                  {' '}
                  {index === 0 ? (
                    <TitleWrapperFirst>{value.title}</TitleWrapperFirst>
                  ) : (
                    <TitleWrapper>{value.title}</TitleWrapper>
                  )}
                </>
              ) : (
                <TitleWrapper> </TitleWrapper>
              )}

              {(value.title || '') !== '' ? (
                <TermsConditionsBox>
                  <div className="in">
                    {value.contents.map((contentsItem) => {
                      return <span key={contentsItem}>{contentsItem}</span>;
                    })}
                  </div>
                </TermsConditionsBox>
              ) : (
                <div className="in">
                  {value.contents.map((contentsItem) => {
                    return <span key={contentsItem}>{contentsItem}</span>;
                  })}
                </div>
              )}

              {(value.title || '') !== '' && (
                <div className="lterm01_chk01">
                  <input
                    type="checkbox"
                    id={`term-${index}`}
                    checked={value.isChecked}
                    onChange={(event) => {
                      if (value.onClickHandler) {
                        value.onClickHandler(event, index);
                      }
                    }}
                  />
                  <label htmlFor={`term-${index}`}>
                    위의 이용약관에 동의합니다.
                  </label>
                </div>
              )}
            </span>
          );
        })}
        <ButtonWrapper
          disabled={!isValidTerm}
          onClick={() => {
            if (onConfirmHandler) {
              onConfirmHandler();
            }
          }}
        >
          <span>다음</span>
        </ButtonWrapper>
      </GeneralContents>
    </JoinWrapper>
  );
}

export default Term;
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
const TermsConditionsBox = styled.div`
  height: 170px;
  border: 1px solid #e5e8eb;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 12px 16px;
  div.in {
    white-space: pre-wrap;
    font-size: 15px;
    line-height: 24px;
    word-break: keep-all;
    word-wrap: break-word;
    span {
      display: inline-block;
      width: 100%;
    }
  }
`;

const TitleWrapperFirst = styled.span`
  padding-bottom: 16px;
  font-size: 18px;
  line-height: 26px;
  font-weight: 700;
  display: block;
`;
const TitleWrapper = styled.span`
  margin-top: 32px;
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
`;
