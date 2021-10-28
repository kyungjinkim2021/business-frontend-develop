import styled, { DefaultTheme, useTheme } from 'styled-components';
import { centerBetween } from '@Styled';
import { useEffect, useState } from 'react';
import Router from 'next/router';

function Header() {
  const [scrollPosition] = useState<number>(0);
  const [pathName, setPathName] = useState<string | undefined>('');
  const theme = useTheme();

  useEffect(() => {
    return setPathName(Router.router?.pathname);
  }, [Router.router?.pathname]);

  return (
    <>
      <NavContainer
        theme={theme}
        scrollPosition={scrollPosition}
        pathName={pathName}
        className="topWrapper"
      >
        <NavMenuMainWrapper>
          <NavLogoContainer
            onClick={() => {
              Router.push('/');
            }}
          >
            Forest
          </NavLogoContainer>
          <NavMenuContainer>
            <NavMenuItemContainer>
              <nav>
                <ul>
                  <li>
                    <a href="#">우리들의 이야기</a>
                  </li>
                  <li>
                    <a href="#">탄소 이야기</a>
                  </li>
                  <li>
                    <a href="#">숲 이야기</a>
                  </li>
                </ul>
              </nav>
            </NavMenuItemContainer>
            <NavMenuRightContainer>
              <NavRightMenuItem
                onClick={() => {
                  Router.push('/member/login');
                }}
              >
                로그인
              </NavRightMenuItem>
              <NavRightMenuItem
                onClick={() => {
                  Router.push('/member/join');
                }}
              >
                회원가입
              </NavRightMenuItem>
              <NavMenIconWrapper>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="bars"
                  className="svg-inline--fa fa-bars fa-w-14"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="#191F28"
                    d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
                  />
                </svg>
              </NavMenIconWrapper>
            </NavMenuRightContainer>
          </NavMenuContainer>
        </NavMenuMainWrapper>

        {/*<NavContainerLine />*/}
      </NavContainer>
    </>
  );
}

export default Header;

const NavMenIconWrapper = styled.div`
  display: flex;
  width: 16px;
  height: 18px;
  margin: 0 30px;
  cursor: pointer;
  svg {
    width: 100%;
  }
`;
const NavRightMenuItem = styled.div`
  width: max-content;
  padding: 0 10px;
  cursor: pointer;
`;

const NavMenuMainWrapper = styled.div`
  padding: 26px 40px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
`;

const NavMenuContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const NavMenuItemContainer = styled.div`
  width: 100%;
  font-size: 15px;
  color: #191f28;
  font-weight: 700;
`;
const NavMenuRightContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333d4b;
`;

const NavLogoContainer = styled.div`
  width: 100px;
  font-weight: bold;
  text-align: center;
  font-size: 24px;
  cursor: pointer;
`;

const NavContainer = styled.div<{
  theme: DefaultTheme;
  scrollPosition: number;
  pathName: string | undefined;
}>`
  ${centerBetween};
  max-height: 1440px;
  border-bottom: 1px solid #c4c4c4;
  background: #ffffff;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin: 0 auto;
  transition: background-color 0.3s;
  z-index: 5;
  background: ${({ theme }) => theme.body};

  nav ul {
    list-style: none;
    text-align: center;
  }
  nav ul li {
    display: inline-block;
    margin: 0;
  }

  nav ul li a:first-child {
    margin-left: 0px;
  }
  nav ul li a {
    display: block;
    text-decoration: none;
    color: ${({ theme }) => theme.text};
    font-weight: 700;
    text-transform: uppercase;
    margin: 0 48px;
    padding: 0px 15px;
  }
  nav ul li a,
  nav ul li a:after,
  nav ul li a:before {
    transition: all 0.5s;
  }
  nav ul li a:hover:after {
    color: #555;
  }

  nav ul li a {
    position: relative;
    text-decoration: none;
  }
  nav ul li a:after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 0%;
    content: '';
    color: transparent;
    background: none;
    height: 1px;
    text-decoration: none;
  }

  nav ul li a:after,
  nav ul li a:hover:after {
    width: 100%;
    text-decoration: none;
  }
`;
