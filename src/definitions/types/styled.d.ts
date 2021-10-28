import 'styled-components';
import { Theme } from './src/ui/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    body: string;
    text: string;
    lightText: string;
    toggleBorder: string;
    background: string;
  }
}
