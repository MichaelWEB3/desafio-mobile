import 'styled-components';
import { ThemeColors } from './src/types/themeColorType';

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeColors { }
}