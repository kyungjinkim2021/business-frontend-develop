import React, { useEffect, useState } from 'react';
import { AppContext, AppInitialProps, AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { appWithTranslation } from 'next-i18next';
import { GlobalStyles, theme } from '@Definitions/styled/theme';
import { NextComponentType } from 'next';
import Loading from '@Components/basic/loading';
import ErrorBoundary from '@Components/basic/error/404';
import { wrapper } from '@Store/store';
import 'antd/dist/antd.css';
import { useRouter } from 'next/router';

const WrapperApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: any) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = () => setLoading(false);
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme.lightTheme}>
        <GlobalStyles />
        {loading ? <Loading loading={loading} /> : <Component {...pageProps} />}
      </ThemeProvider>
    </ErrorBoundary>
  );
};

WrapperApp.getInitialProps = async ({
  Component,
  ctx
}: AppContext): Promise<AppInitialProps> => {
  let pageProps: any = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};
export default wrapper.withRedux(appWithTranslation(WrapperApp as any));
