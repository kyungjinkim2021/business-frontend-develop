import styled, { DefaultTheme } from 'styled-components';
import Template from '@Template';

function Corporate() {
  const createMarkup = () => {
    return {
      __html:
        '제 1 장 총칙 \n' +
        '제 1 조 (목적)\n' +
        '이 약관은 산림청이 제공하는 산림탄소등록부(이하 "등록부"라 함)와 관련 제반 서비스의 이용과 관련하여 회원과 산림청간의 권리, 의무 및 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.\n' +
        '제 2 조 (용어의 정의)\n' +
        '이 약관에서 사용하는 용어의 정의는 다음과 같습니다.\n' +
        '이용자 : 서비스에 접속하여 산림청(산림탄소상쇄제도 운영기관인'
    };
  };

  return (
    <Template title="탄소 상쇄 플랫폼">
      <JoinWrapper>
        <GeneralTitle>회원가입</GeneralTitle>
        <GeneralContents>
          <TitleWrapperFirst>약관동의</TitleWrapperFirst>
          <TermsConditionsBox>
            <div className="in" dangerouslySetInnerHTML={createMarkup()} />
          </TermsConditionsBox>
          <div className="lterm01_chk01">
            <input type="checkbox" id="term01" />
            <label htmlFor="term01">위의 이용약관에 동의합니다.</label>
          </div>
          <TitleWrapper>개인정보 수집·이용 동의</TitleWrapper>
          <TermsConditionsBox>
            <div className="in" dangerouslySetInnerHTML={createMarkup()} />
          </TermsConditionsBox>
          <div className="lterm01_chk01">
            <input type="checkbox" id="term02" />
            <label htmlFor="term02">
              위의 개인정보 수집·이용 동의 약관에 동의합니다.
            </label>
          </div>
          <ButtonWrapper>
            <span>다음</span>
          </ButtonWrapper>
        </GeneralContents>
      </JoinWrapper>
    </Template>
  );
}

export default Corporate;

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

const ButtonWrapper = styled.div`
  margin-top: 32px;
  span {
    display: block;
    cursor: pointer;
    text-align: center;
    background: #191f28;
    font-size: 15px;
    line-height: 46px;
    color: #ffffff;
    font-weight: 700;
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
