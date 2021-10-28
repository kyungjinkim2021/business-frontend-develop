import styled, { DefaultTheme } from 'styled-components';
import { Input } from 'antd';

import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import Router from 'next/router';

import Template from '../../../ui/layouts/template';

function Login() {
  return (
    <Template title="탄소 상쇄 플랫폼">
      <LoginWrapper>
        <LoginForm className="form">
          <LoginTitle>MEMBER LOGIN</LoginTitle>
          <form className="login-form">
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="아이디"
              style={{ marginBottom: '20px' }}
              maxLength={30}
            />
            <Input
              prefix={
                <KeyOutlined className="site-form-item-icon" rotate={225} />
              }
              type="password"
              placeholder="비밀번호"
              style={{ marginBottom: '20px' }}
              maxLength={30}
            />
            <button>로그인</button>
            <LoginMessage>
              <ul>
                <li>
                  <span>아이디 찾기</span>
                </li>
                <li>
                  <span>비밀번호 찾기</span>
                </li>
                <li>
                  <span
                    onClick={() => {
                      Router.push('/member/join').then();
                    }}
                  >
                    회원가입
                  </span>
                </li>
              </ul>
            </LoginMessage>
          </form>
        </LoginForm>
      </LoginWrapper>
    </Template>
  );
}

export default Login;

const LoginForm = styled.div`
  .ant-input-prefix {
    .anticon {
      width: 28px;
      font-size: 22px;
      color: gray;
    }
    margin-right: 10px;
  }
  .ant-input {
    height: 64px;
  }
  .ant-input-affix-wrapper {
    padding: 0px 11px;
  }
  input {
    line-height: 26px;
    font-size: 18px;
  }
  ul {
    list-style: none;
    text-align: center;
  }
  ul li {
    display: inline-block;
    margin: 0;
  }

  ul li:not(:first-child):before {
    content: '';
    display: block;
    width: 1px;
    height: 12px;
    background: #e5e8eb;
    position: relative;
    margin-bottom: -17px;
    left: 0;
  }
  ul li span {
    display: block;
    font-size: 15px;
    line-height: 22px;
    color: ${({ theme }) => theme.lightText};
    margin: 0 10px;
    padding: 0px 15px;
    text-decoration: none;
    cursor: pointer;
  }
`;

const LoginMessage = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`;
const LoginTitle = styled.span`
  width: 100%;
  font-weight: 700;
  font-size: 32px;
  text-align: center;
  margin-bottom: 32px;
  display: inline-block;
  text-decoration: none;
`;

const LoginWrapper = styled.div<{
  theme: DefaultTheme;
}>`
  width: 490px;
  padding: 7% 0 0;
  margin: auto;

  .form {
    position: relative;
    z-index: 1;
    max-width: 860px;
    margin: 0 auto 100px;
    padding: 45px;
  }

  button {
    height: 64px;
    text-transform: uppercase;
    outline: 0;
    background: ${({ theme }) => theme.text};
    width: 100%;
    border: 0;
    padding: 15px;
    color: ${({ theme }) => theme.body};
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    margin-top: 10px;
    font-weight: 700;
    font-size: 20px;
  }
  span {
  }
`;
